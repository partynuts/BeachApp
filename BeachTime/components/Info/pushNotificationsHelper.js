import { Notifications } from 'expo';
import * as ExpoNotifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { apiHost } from '../../config';
import Constants from 'expo-constants';

export default async function registerForPushNotificationsAsync(userId) {
  if (!Constants.isDevice) {
    return;
  }

  const PUSH_ENDPOINT = `${apiHost}/users/${userId}`;
  let status;
  console.log(Constants.isDevice)
  console.log("get Push notifications permission helper")
  try {
    status = (await Permissions.askAsync(Permissions.NOTIFICATIONS).catch(e => console.log("ERROR", e))).status;
  } catch {
    status = 'failed';
  }

  if (status !== 'granted') {
    console.log("NO PERMISSION GRANTED", status)
    alert('No notification permissions!');
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();
  console.log("PERMISSION GRANTED", status, "TOKEN", typeof token)

  return fetch(PUSH_ENDPOINT, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      notifications_token: token
    }),
  });
}

export function handlePushNotifications() {
  ExpoNotifications.setNotificationHandler({
    handleNotification: async (event) => {
      console.log("EVENT", event);
      return Promise.reject("BLA")
      // return {
      //   shouldShowAlert: false,
      //   shouldPlaySound: false,
      //   shouldSetBadge: false,
      // }
    },
  });
}
