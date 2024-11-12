import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MarketplaceScreen from './src/screens/MarketplaceScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LogisticsScreen from './src/screens/LogisticsScreen';
import VeterenaryScreen from './src/screens/VeterenaryScreen';
import StadoScreen from './src/screens/StadoScreen';
import Icon from 'react-native-vector-icons/Ionicons'; // Для иконок на панели (по желанию)

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Маркетплейс"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Маркетплейс') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Профиль') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Логистика') {
              iconName = focused ? 'car' : 'car-outline';
            } else if(route.name === 'Ветеринария'){
                iconName = focused ? 'medkit' : 'medkit-outline';
            } else if(route.name === 'Мое стадо'){
                iconName = focused ? 'paw' : 'paw-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#5C832F', // Основной цвет
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Мое стадо" component={StadoScreen} />
        <Tab.Screen name="Профиль" component={ProfileScreen} />
        <Tab.Screen name="Маркетплейс" component={MarketplaceScreen} />
        <Tab.Screen name="Логистика" component={LogisticsScreen} />
        <Tab.Screen name="Ветеринария" component={VeterenaryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
