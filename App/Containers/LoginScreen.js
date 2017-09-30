import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { Card, FormInput, FormLabel } from 'react-native-elements'
import { Text, Button } from '../UI'
import Parse from 'parse/react-native'
import { NavigationActions } from 'react-navigation'
import LoginActions, { login } from '../Redux/LoginRedux'

class LoginScreen extends Component {
  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: targetRoute })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    var error = null
    if (this.props.error) {
      error = <Text color="error">{this.props.error}</Text>
    }

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="position">
          <Card>
            <FormLabel>Username</FormLabel>
            <FormInput
              value={this.props.username}
              onChangeText={text => this.props.setUsername(text)}
            />
            <FormLabel>Password</FormLabel>
            <FormInput
              secureTextEntry={true}
              value={this.props.password}
              onChangeText={text => this.props.setPassword(text)}
            />
            <Button
              onPress={() => {
                Parse.User.currentAsync().then(out => {
                  if (out) {
                    Parse.User.logOut()
                  }
                })
                this.props
                  .login()
                  .then(() => {
                    this.resetNavigation('MainScreen')
                  })
                  .catch(() => {})
              }}
              title="Sign in"
              my={2}
            />
            {error}
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  const { username, password, token, error } = state.login
  return { username, password, token, error }
}

const mapDispatchToProps = dispatch => ({
  setUsername: text => dispatch(LoginActions.setUsername(text)),
  setPassword: text => dispatch(LoginActions.setPassword(text)),
  login: () => dispatch(login())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
