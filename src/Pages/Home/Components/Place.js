import { StyleSheet, Text, View } from 'react-native';
import theme from '../../../../theme';

const Place = ({ place }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row', gap: 16 }}>
        <View style={styles.icon}></View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Text style={styles.placeName}>{place.name}</Text>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <View style={styles.category}>
              <Text
                style={{ ...styles.text, color: theme.colors.secondary.main }}
              >
                {place.category}
              </Text>
            </View>
            <Text style={styles.text}>{place.distance}</Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Text style={styles.text}>{place.rating}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 50,
    backgroundColor: '#eee',
  },
  placeName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  category: {
    backgroundColor: theme.colors.secondary.light,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 50,
  },
  text: {
    fontSize: 10,
  },
});

export default Place;
