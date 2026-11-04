import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, sizes, spacing, type } from '../theme/theme';

type ConsultButtonProps = {
  onPress: () => void;
  disabled?: boolean;
};

export function ConsultButton({ onPress, disabled = false }: ConsultButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel="Consultar"
      accessibilityState={{ disabled }}
      testID="consult-button"
      style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.disabled]}
    >
      <Text style={styles.label}>Consultar</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    minHeight: sizes.primaryButtonHeight,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.button,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...type.button,
    color: colors.onPrimary,
  },
});
