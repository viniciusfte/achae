import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import logoPlace from '../../../../../assets/foto.png';
import theme from '../../../../../theme';

const CardEventFeed = ({ event }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.imageEvent} source={logoPlace} />
      <Text style={styles.name}>{event.name}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={styles.eventName}>{event.eventName}</Text>
          <View style={styles.category}>
            <Text style={styles.textCategory}>{event.category}</Text>
          </View>
          <Text style={styles.text}>{event.distance}</Text>
        </View>
        <Text style={styles.text}>{event.rating}</Text>
      </View>
    </View>
  );
};

export default CardEventFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
  },
  imageEvent: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  eventName: {
    fontSize: 12,
  },
  category: {
    backgroundColor: theme.colors.secondary.light,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  textCategory: {
    fontSize: 10,
    color: theme.colors.secondary.main,
  },
  text: {
    fontSize: 10,
  },
});
