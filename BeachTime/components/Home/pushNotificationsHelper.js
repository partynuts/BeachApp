import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { apiHost } from '../../config';


export default async function registerForPushNotificationsAsync(userId) {
  const PUSH_ENDPOINT = `${apiHost}/users/${userId}`;

  console.log("get Push notifications permission helper")
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

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
