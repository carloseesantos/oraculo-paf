// Dependency-free check of src/data/messages.json and of the pure validation /
// random-pick utilities. Requires Node >= 22.18 (native TypeScript type stripping).
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { pickRandomMessage } from '../src/utils/randomMessage.ts';
import { validateMessages } from '../src/utils/validateMessage.ts';

const results = [];
function check(name, fn) {
  try {
    fn();
    results.push({ name, ok: true });
  } catch (error) {
    results.push({ name, ok: false, error: error.message });
  }
}

const raw = JSON.parse(readFileSync(new URL('../src/data/messages.json', import.meta.url), 'utf8'));
const { valid, rejected } = validateMessages(raw);

const perTone = valid.reduce((acc, m) => ({ ...acc, [m.tone]: (acc[m.tone] ?? 0) + 1 }), {});
const longest = valid.reduce((a, b) => ([...b.text].length > [...a.text].length ? b : a), valid[0]);

console.log('== messages.json ==');
console.log(`registros no arquivo: ${raw.length}`);
console.log(`válidos no pool:      ${valid.length}`);
console.log(`rejeitados:           ${rejected.length}`, rejected.length ? rejected : '');
console.log('por tom:             ', perTone);
console.log(`mais longa:           ${longest.id} (${[...longest.text].length} caracteres)`);
console.log(`shareable=false:      ${valid.filter((m) => !m.shareable).length}`);

check('JSON real: nenhum registro rejeitado', () => assert.equal(rejected.length, 0));
check('JSON real: >= 15 mensagens válidas (DEC-017)', () => assert.ok(valid.length >= 15));
check('JSON real: >= 5 válidas por tom (DEC-017)', () => {
  for (const tone of ['poetica', 'mistica', 'humoristica']) assert.ok((perTone[tone] ?? 0) >= 5, tone);
});

const base = { id: 'x-1', text: 'Texto', tone: 'mistica', category: 'teste', tags: [], shareable: true };
const reasonsFor = (items) => validateMessages(items).rejected.map((r) => r.reason);

check('sem id é rejeitada', () => assert.deepEqual(reasonsFor([{ ...base, id: undefined }]), ['id ausente ou vazio']));
check('text vazio é rejeitada', () => assert.deepEqual(reasonsFor([{ ...base, text: '   ' }]), ['text ausente ou vazio']));
check('sem tone é rejeitada', () => assert.equal(reasonsFor([{ ...base, tone: undefined }]).length, 1));
check('tone fora do conjunto é rejeitada', () => assert.equal(reasonsFor([{ ...base, tone: 'poética' }]).length, 1));
check('tags inválidas são rejeitadas', () => assert.equal(reasonsFor([{ ...base, tags: 'a,b' }]).length, 1));
check('shareable não boolean é rejeitada', () => assert.equal(reasonsFor([{ ...base, shareable: 'sim' }]).length, 1));
check('id duplicado: mantém a primeira, rejeita a segunda', () => {
  const r = validateMessages([base, { ...base, text: 'Outra' }]);
  assert.equal(r.valid.length, 1);
  assert.equal(r.valid[0].text, 'Texto');
  assert.deepEqual(r.rejected.map((x) => x.reason), ['id duplicado']);
});
check('campo extra (author) é aceito', () => assert.equal(validateMessages([{ ...base, author: 'PAF' }]).valid.length, 1));
check('shareable=false continua válida', () => assert.equal(validateMessages([{ ...base, shareable: false }]).valid.length, 1));
check('conteúdo não-array => pool vazio', () => assert.equal(validateMessages({ foo: 1 }).valid.length, 0));
check('só inválidas => pool vazio sem exceção', () =>
  assert.equal(validateMessages([null, 42, { ...base, id: '' }]).valid.length, 0));

check('sorteio em pool vazio retorna null', () => assert.equal(pickRandomMessage([]), null));
check('sorteio com random()=0.9999 fica dentro do pool', () =>
  assert.equal(pickRandomMessage(valid, () => 0.9999), valid[valid.length - 1]));
check('sorteio retorna sempre item do pool e cobre todo o pool em 5000 tentativas', () => {
  const ids = new Set(valid.map((m) => m.id));
  const seen = new Set();
  for (let i = 0; i < 5000; i++) {
    const picked = pickRandomMessage(valid);
    assert.ok(ids.has(picked.id));
    seen.add(picked.id);
  }
  assert.equal(seen.size, valid.length);
});

console.log('\n== checks ==');
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok ? '' : ` -> ${r.error}`}`);
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed ? 1 : 0);
