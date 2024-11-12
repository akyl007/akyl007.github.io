import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserContext } from '../services/UserContext';

const ProfileScreen = () => {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профиль пользователя</Text>
      <Text>Имя: {user?.name || 'Гость'}</Text>
      <Text>Email: {user?.email || 'Не указано'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ProfileScreen;
