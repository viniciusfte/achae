import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import theme from '../../theme';

const SegmentedControl = ({ options, selectedOption, onOptionPress }) => {
  const { width: windowWidth } = useWindowDimensions();

  const internalPadding = 25;
  const segmentedControlWidth = windowWidth - 150;
  const itemWidth = (segmentedControlWidth - internalPadding) / options.length;

  const leftPosition = useSharedValue(
    itemWidth * options.indexOf(selectedOption) + internalPadding / 2,
  );

  useEffect(() => {
    leftPosition.value = withTiming(
      itemWidth * options.indexOf(selectedOption) + internalPadding / 2,
      { duration: 300 },
    );
  }, [selectedOption, itemWidth, internalPadding, options]);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: leftPosition.value }],
    };
  });

  return (
    <View
      style={[
        styles.container,
        {
          width: segmentedControlWidth,
          borderRadius: 50,
          paddingLeft: internalPadding / 2,
        },
      ]}
    >
      <Animated.View
        style={[
          {
            width: itemWidth,
          },
          rStyle,
          styles.activeBox,
        ]}
      />
      {options.map((option) => (
        <TouchableOpacity
          onPress={() => {
            onOptionPress?.(option);
          }}
          key={option}
          style={[
            {
              width: itemWidth,
            },
            styles.labelContainer,
          ]}
        >
          <Text
            style={{
              ...styles.label,
              color:
                selectedOption === option
                  ? theme.colors.white
                  : theme.colors.text,
            }}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  activeBox: {
    position: 'absolute',
    borderRadius: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    height: '60%',
    top: '20%',
    backgroundColor: theme.colors.primary.main,
  },
  labelContainer: { justifyContent: 'center', alignItems: 'center' },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export { SegmentedControl };
