import React, { Component } from 'react'
import { Flex, Text, Button } from '../UI'
import { scale } from '../UI/theme'
import Parse from 'parse/react-native'
import { NavigationActions } from 'react-navigation'

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
    Parse.serverURL = 'https://aws.blink.care/parse'
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
        <Text f={6} fontWeight="bold" color="white" align="center">
          Blink
        </Text>
        <Button
          onPress={() => this.props.navigation.navigate('LoginScreen')}
          title="Sign in"
          bg="secondary"
          buttonStyle={{marginVertical: scale[1]}}
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
