import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const IconButton = ({
  onPress,
  icon = '',
  size = 16,
  style,
  color = '#000',
}) => {
  return (
    <TouchableOpacity
      style={{ ...style, ...styles.container }}
      onPress={onPress}
    >
      <View style={styles.button}>
        <MaterialIcons name={icon} size={size} color={color} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: 60,
    height: 60,
    justifyContent: 'center',
    borderRadius: 50,
  },
  button: {
    alignItems: 'center',
  },
});

export default IconButton;
