import * as Notifications from 'expo-notifications';

export const scheduleNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Напоминание",
      body: "Пора проверить состояние животных!",
    },
    trigger: { seconds: 3600 }, // Каждые 1 час
  });
};
