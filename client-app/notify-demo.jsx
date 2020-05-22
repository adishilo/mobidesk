import React, {Component} from 'react';
import {TextInput, View, Keyboard, Text, StyleSheet} from 'react-native';
import {Constants, Notifications} from 'expo';

export class Timer extends Component {
    async onSubmit(e) {
        Keyboard.dismiss();

        const schedulingOptions = {
            time: (new Date()).getTime() + Number(e.nativeEvent.text)
        }

        // Notifications show only when app is not active.
        // (ie. another app being used or device's screen is locked)
        const notifyId = await Notifications.presentLocalNotificationAsync({
          title: 'Hello',
          body: 'This is a notification for the MobiDesk application running!',
          android: {
            sticky: true
          }
        });

        setTimeout(() => {
          Notifications.dismissAllNotificationsAsync();
        }, 5000);
    }

    handleNotification() {
        console.warn('ok! got your notif');
    }

    async componentDidMount() {
        // We need to ask for Notification permissions for ios devices
        // let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        // if (Constants.isDevice && result.status === 'granted') {
        //     console.log('Notification permissions granted.')
        // }

        // If we want to do something with the notification when the app
        // is active, we need to listen to notification events and 
        // handle them in a callback
        Notifications.addListener(this.handleNotification);
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <TextInput
                    onSubmitEditing={this.onSubmit}
                    placeholder={'time in ms'}
                />
            </View>
        );
    }
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Timer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});