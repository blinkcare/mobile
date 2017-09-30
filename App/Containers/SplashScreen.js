import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'
import Parse from 'parse/react-native'
import { Colors } from '../Themes/'
import styles from './Styles/SplashScreenStyle'

class SplashScreen extends Component {
  static navigationOptions = {
    title: 'Blink!',
    headerLeft: null
  }

  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: targetRoute })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  componentWillMount() {
    console.log('Initializing')
    Parse.initialize('APPLICATION_ID')
    Parse.serverURL = 'http://192.168.100.113:1337/parse'
    Parse.User.currentAsync().then(out => {
      if (out != null) {
        console.log(out)
        this.props.navigation.navigate('MainScreen')
      }
    })
  }

  render() {
    return (
      <View style={styles.view}>
        <KeyboardAvoidingView behavior="position">
          <Button
            onPress={() => this.props.navigation.navigate('LoginScreen')}
            title="Log in"
            backgroundColor={Colors.grey}
            style={styles.login}
          />
          <Button
            onPress={() => this.props.navigation.navigate('SignupScreen')}
            title="Sign up"
            backgroundColor={Colors.blue}
            style={styles.signup}
          />
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export default SplashScreen
