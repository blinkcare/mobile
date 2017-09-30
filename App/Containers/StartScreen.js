import React, { Component } from 'react'
import { Flex, Text, Button } from '../UI'
import Parse from 'parse/react-native'

class StartScreen extends Component {
  static navigationOptions = {
    header: null
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
    Parse.serverURL = 'http://blinkserver.us-east-1.elasticbeanstalk.com/parse'
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
        bg="primary"
        style={{ height: '100%' }}
      >
        <Text f={6} fontWeight="bold" color="white" align="center" mb={2}>
          Blink!
        </Text>
        <Button
          onPress={() => this.props.navigation.navigate('LoginScreen')}
          title="Sign in"
          bg="secondary"
          mb={2}
        />
        <Button
          onPress={() => this.props.navigation.navigate('SignupScreen')}
          title="Get started"
          bg="white"
          color="primary"
          fontWeight="bold"
        />
      </Flex>
    )
  }
}

export default StartScreen
