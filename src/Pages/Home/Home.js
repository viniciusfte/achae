import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import MapView, {
  Callout,
  Marker,
  onRegionChangeComplete,
} from 'react-native-maps';
import HeaderHome from './Components/HeaderHome';
import DrawerPlaces from './Components/Drawer/DrawerPlaces';
import CardEventFeed from './Components/Card/CardEventFeed';
import { Dimensions } from 'react-native';
import placesList from '../../../placesList';
import theme from '../../../theme';

// const events = [
//   {
//     name: 'Mandalla RoofTop',
//     eventName: 'Tardezinha do Mandalla',
//     category: 'Boate',
//     distance: '0.6 km',

//     rating: '4.4',
//   },
//   {
//     name: 'Bar do Serginho',
//     eventName: 'Rodizio de churrasco',
//     category: 'Restaurante',
//     distance: '4.4 km',
//     rating: '4.4',
//   },
//   {
//     name: 'Bar do Serginho',
//     eventName: 'Rodizio de churrasco',
//     category: 'Restaurante',
//     distance: '4.4 km',
//     rating: '4.4',
//   },
//   {
//     name: 'Bar do Serginho',
//     eventName: 'Rodizio de churrasco',
//     category: 'Restaurante',
//     distance: '4.4 km',
//     rating: '4.4',
//   },
//   {
//     name: 'Bar do Serginho',
//     eventName: 'Rodizio de churrasco',
//     category: 'Restaurante',
//     distance: '4.4 km',
//     rating: '4.4',
//   },
// ];
const Home = () => {
  const markerPlace = require('../../../assets/markerPlace.png');
  const [visualization, setVisualization] = useState('Visão Mapa');
  const [location, setLocation] = useState(null);
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;

  const latitudeDelta = 0.05;
  const longitudeDelta = latitudeDelta * ASPECT_RATIO;
  const requestLocationPermissions = async () => {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  };

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  const handleRegionChangeComplete = (newRegion) => {
    console.log('Nova região:', newRegion);
  };

  return (
    <View style={styles.container}>
      {visualization === 'Visão Mapa' ? (
        <>
          {location && (
            <MapView
              userInterfaceStyle="light"
              style={styles.map}
              initialRegion={{
                latitude: -20.12742315856842,
                longitude: -44.882076872487126,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
              }}
              onRegionChangeComplete={handleRegionChangeComplete}
              zoomEnabled={true}
              showsUserLocation={true}
              loadingEnabled={true}
            >
              {placesList.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.geometry.location.lat,
                    longitude: marker.geometry.location.lng,
                  }}
                  title="teste"
                  description="teste"
                >
                  <Image
                    source={markerPlace}
                    style={{ width: 30, height: 30 }}
                  />

                  <Callout tooltip>
                    <View style={styles.calloutContainer}>
                      <Text style={styles.calloutTitle}>{marker.name}</Text>
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView>
          )}
          <DrawerPlaces events={placesList} />
        </>
      ) : (
        <ScrollView
          style={styles.containerEvents}
          contentContainerStyle={{ rowGap: 16 }}
        >
          <Text style={styles.title}>Próximos eventos</Text>

          {placesList.map((event, index) => (
            <CardEventFeed event={event} key={index} />
          ))}
        </ScrollView>
      )}
      {/* Caso alguém for mexer para o header funcionar no google ele precisa ficar abaixo da tag de fechamento do MapView */}
      <HeaderHome
        visualization={visualization}
        setVisualization={setVisualization}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    zIndex: -1,
    elevation: -1,
  },
  calloutContainer: {
    flex: 1,
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    border: '1px solid #D2D2D2',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  calloutTitle: {
    fontWeight: 'bold',
    color: theme.colors.text.main,
    fontSize: 12,
  },

  containerEvents: {
    flex: 1,
    gap: 16,
    marginTop: 130,
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
