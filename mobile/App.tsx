import './src/lib/dayjs';

import { Button, StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter';
import * as Notifications from 'expo-notifications';

import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  }),
});

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  async function schedulePushNotification() {
    const schedule = await Notifications.getAllScheduledNotificationsAsync();
    console.log("Agendadas: ", schedule);

    if (schedule.length > 0) {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }

    const trigger = new Date(Date.now());
    trigger.setMinutes(trigger.getMinutes() + 5)
    // trigger.setHours(trigger.getHours() + 5);
    // trigger.setSeconds(0);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Olá, Alisson Andrade! 😀",
        body: "Você praticou seus hábitos hoje?"
      },
      trigger
    });
  }

  useEffect(() => {
    schedulePushNotification();
  }, []);

  if (!fontsLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <>
     <Routes />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {/*<Button title="Enviar" onPress={schedulePushNotification} /> */}
      {/*<Button title="Agendadas" onPress={schedulePushNotification} /> */}
    </>
  );
}