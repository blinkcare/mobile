import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { Flex, Button } from '../UI'
import Parse from 'parse/react-native'

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
    Parse.initialize('APPLICATION_ID')
    Parse.serverURL = 'http://192.168.100.113:1337/parse'
    Parse.User.currentAsync().then(out => {
      if (out != null) {
        this.props.navigation.navigate('MainScreen')
      }
    })
  }

  render() {
    return (
      <Flex
        flexDirection="column"
        justifyContent="center"
        style={{ height: '100%' }}
      >
        <Button
          onPress={() => this.props.navigation.navigate('LoginScreen')}
          title="Log in"
          bg="secondary"
          mb={2}
        />
        <Button
          onPress={() => this.props.navigation.navigate('SignupScreen')}
          title="Sign up"
          bg="primary"
        />
      </Flex>
    )
  }
}

export default SplashScreen
