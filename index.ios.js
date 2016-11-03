import React, { Component } from 'react';
import { AppRegistry, Text, TouchableHighlight, View } from 'react-native';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAr8IVwDnE890Xdi35ZIFD1Dmm8_Ikd08U",
  authDomain: "msu-ticker.firebaseapp.com",
  databaseURL: "https://msu-ticker.firebaseio.com",
  storageBucket: "msu-ticker.appspot.com",
  messagingSenderId: "266941337406"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const counterAction = {
  INCREMENT: '+',
  DECREMENT: '-'
};

class TestProject extends Component {

  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.counterRef = firebaseApp.database().ref();
  }

  updateCounterOnChange(counterRef) {
    counterRef.on('value', (snapshot) => {
      let value = snapshot.val();
      this.setState({ count: value });
    });
  }

  updateCounter(action) {
    let count = this.state.count;

    if (action === counterAction.INCREMENT) {
      count += 1
    } else if (action === counterAction.DECREMENT) {
      count -= 1
    }

    this.counterRef.set(count);
  }

  increment() {
    this.updateCounter(counterAction.INCREMENT);
  }

  decrement() {
    this.updateCounter(counterAction.DECREMENT);
  }

  componentDidMount() {
    this.updateCounterOnChange(this.counterRef);
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TouchableHighlight onPress={() => this.increment()}>
          <View style={{
            width: 250,
            height: 250,
            backgroundColor: 'skyblue',
            paddingTop: 15
          }}>
            <Text style={{
              color: 'white',
              fontSize: 150,
              textAlign: 'center'
            }}>+</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.decrement()}>
          <View style={{
            width: 250,
            height: 250,
            backgroundColor: 'teal',
            paddingTop: 15
          }}>
            <Text style={{
              color: 'white',
              fontSize: 150,
              textAlign: 'center'
            }}>-</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

}

AppRegistry.registerComponent('TestProject', () => TestProject);
