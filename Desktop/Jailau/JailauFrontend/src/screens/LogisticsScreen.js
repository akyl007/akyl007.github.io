import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LogisticsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Логистика</Text>
      {/* Здесь вы можете добавить функции для заказа перевозки и отслеживания */}
      <Button title="Отправить логистический заказ" onPress={() => { /* Функция для отправки заказа */ }} />
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

export default LogisticsScreen;
