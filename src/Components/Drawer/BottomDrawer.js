import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import theme from '../../../theme';

const { height: screenHeight } = Dimensions.get('screen');

const BottomDrawer = forwardRef(
  (
    {
      expanded = false,
      setExpanded,
      title,
      closeIcon,
      children,
      expandedHeight = screenHeight * 0.8,
      retractHeight = screenHeight * 0.5,
      style,
    },
    ref,
  ) => {
    const translateY = useSharedValue(expandedHeight);

    const toggleDrawer = () => {
      setExpanded(!expanded);
      translateY.value = withSpring(expanded ? expandedHeight : retractHeight, {
        damping: 20,
      });
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
      };
    });

    useImperativeHandle(ref, () => ({
      toggleDrawer,
    }));

    return (
      <>
        <Animated.View style={[styles.drawerContainer, animatedStyle, style]}>
          <View style={styles.drawerHeader}>
            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity
              onPress={toggleDrawer}
              style={styles.expandButton}
            >
              {closeIcon}
            </TouchableOpacity>
          </View>

          {children}
        </Animated.View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  drawerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: screenHeight,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  drawerHeader: {
    height: 60,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  expandButton: {
    position: 'absolute',
    right: 10,
    padding: 10,
    borderRadius: 20,
  },
});

export default BottomDrawer;
