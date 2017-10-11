import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from "expo";

const DECK_STORAGE_KEY = 'FlashCards:deck';
const NOTIFICATION_KEY = 'FlashCards:notifications';

export async function getAllDecks() {
  let response = await AsyncStorage.getItem(DECK_STORAGE_KEY);
  if (response == null) {
    await setDummyData();
  }
  return AsyncStorage.getItem(DECK_STORAGE_KEY);
}

export function getDeckById(title) {
  let data = {}
  AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      data = JSON.parse(results);
    });
  return data[title];
}

export function submitDeck({ title, deck }) {
  AsyncStorage.getItem(DECK_STORAGE_KEY, (err, result) => {
    if (result === null) {
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]: deck
      }));
    } else {
      AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({ [title]: deck }));
    }
  });
}

export function setDummyData() {
  let dummyData = {};
  const title = 'JavaScript';
  dummyData = {
    title: title,
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
  return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: dummyData
  }));
}

export function submitCard(title, entry) {
  AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      data = JSON.parse(results);
      const currentDeck = data[title];

      const currentQuestions = currentDeck.questions;
      const updatedQuestions = currentQuestions.push(entry);
      currentDeck.questions = Object.assign(currentQuestions, entry);
      AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({ [title]: currentDeck }));
    })
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}


function createNotification() {
  return {
    title: 'Quiz of the day',
    body: "👋 don't forget to do the quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMintutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
      }
    })
}