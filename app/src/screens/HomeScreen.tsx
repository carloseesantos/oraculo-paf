import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ConsultButton } from '../components/ConsultButton';
import { MessageCard } from '../components/MessageCard';
import { useOracleMessage } from '../hooks/useOracleMessage';
import { colors, spacing, type } from '../theme/theme';

export function HomeScreen() {
  const { status, currentMessage, consult } = useOracleMessage();
  const unavailable = status === 'unavailable';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} accessibilityRole="header">
            ORÁCULO PAF
          </Text>
          <Text style={styles.subtitle}>Uma mensagem para este momento.</Text>
        </View>

        <ConsultButton onPress={consult} disabled={unavailable} />

        {unavailable ? (
          <Text style={styles.stateText} testID="messages-unavailable">
            Não foi possível carregar as mensagens desta versão.
          </Text>
        ) : currentMessage ? (
          <MessageCard message={currentMessage} testID="message-card" />
        ) : (
          <Text style={styles.stateText} testID="message-placeholder">
            Sua mensagem aparecerá aqui.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    gap: spacing.xl,
  },
  header: {
    gap: spacing.sm,
  },
  title: {
    ...type.title,
    color: colors.onBackground,
  },
  subtitle: {
    ...type.body,
    color: colors.muted,
  },
  stateText: {
    ...type.body,
    color: colors.muted,
    textAlign: 'center',
  },
});
