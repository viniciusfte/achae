// App.js
import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { styles } from './AppStyles'; // Seu AppStyles.js
import Home from './src/Pages/Home/Home'; // Sua tela Home
import SearchScreen from './src/Pages/Search/SearchScreen';
import NotificationsScreen from './src/Pages/Notifications/NotificationsScreen';
import ProfileScreen from './src/Pages/Profile/ProfileScreen';
import theme from './theme'; // Seu theme.js

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Principal') {
                iconName = focused ? 'home' : 'home-outline'; // Exemplo, podemos ajustar
              } else if (route.name === 'Busca') {
                iconName = focused ? 'search' : 'search-outline'; // Exemplo
              } else if (route.name === 'Notificações') {
                iconName = focused ? 'notifications' : 'notifications-none';
              } else if (route.name === 'Perfil') {
                iconName = focused ? 'person' : 'person-outline';
              }

              // Você pode retornar qualquer componente aqui!
              // Usaremos MaterialIcons como exemplo, ajuste os nomes dos ícones conforme disponíveis.
              // Para ícones "outline" pode ser necessário usar uma lib diferente ou nomes específicos.
              // Por simplicidade, vou usar os ícones padrão e você pode refinar.
              if (route.name === 'Principal') iconName = 'home';
              else if (route.name === 'Busca') iconName = 'search';
              else if (route.name === 'Notificações')
                iconName = 'notifications';
              else if (route.name === 'Perfil') iconName = 'person';

              return (
                <MaterialIcons name={iconName} size={size} color={color} />
              );
            },
            tabBarActiveTintColor: theme.colors.primary.main, // Cor do ícone e texto ativos
            tabBarInactiveTintColor: 'gray', // Cor do ícone e texto inativos
            headerShown: false, // Para não mostrar o header padrão do Tab Navigator
            tabBarStyle: {
              // Estilos adicionais para a tab bar se necessário
              // backgroundColor: theme.colors.white,
            },
            tabBarLabelStyle: {
              fontSize: 10, // Tamanho da fonte do label
              // fontFamily: theme.fonts.regular // Fonte do label
            },
          })}
        >
          <Tab.Screen name="Principal" component={Home} />
          <Tab.Screen name="Busca" component={SearchScreen} />
          <Tab.Screen name="Notificações" component={NotificationsScreen} />
          <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}
