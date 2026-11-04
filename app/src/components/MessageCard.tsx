import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { colors, radius, sizes, spacing, type } from '../theme/theme';
import type { OracleMessage } from '../types/message.types';

const SCREEN_SIDE_MARGINS = spacing.xl * 2;
const NARROW_CARD_WIDTH = 300;

type MessageCardProps = {
  message: OracleMessage;
  testID?: string;
};

export function MessageCard({ message, testID }: MessageCardProps) {
  const { width: windowWidth } = useWindowDimensions();
  const cardWidth = Math.min(windowWidth - SCREEN_SIDE_MARGINS, sizes.cardMaxWidth);
  const padding = cardWidth < NARROW_CARD_WIDTH ? 20 : spacing.xl;

  // minHeight (not a fixed aspectRatio) keeps the 4:5 shape while letting the
  // card grow with large system fonts instead of clipping the message.
  return (
    <View
      testID={testID}
      collapsable={false}
      style={[styles.card, { width: cardWidth, minHeight: cardWidth * 1.25, padding }]}
    >
      <Text style={styles.brand} accessibilityRole="header">
        ORÁCULO PAF
      </Text>
      <Text style={styles.message} testID="message-text">
        {message.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
  },
  brand: {
    ...type.cardBrand,
    color: colors.onCard,
    textAlign: 'center',
  },
  message: {
    ...type.cardMessage,
    color: colors.onCard,
    textAlign: 'center',
  },
});
