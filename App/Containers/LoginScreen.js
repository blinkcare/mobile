import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { FormInput, FormLabel } from 'react-native-elements'
import { Card, Text, Button } from '../UI'
import Parse from 'parse/react-native'
import { NavigationActions } from 'react-navigation'
import LoginActions, { login, reset } from '../Redux/LoginRedux'

class LoginScreen extends Component {
  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: targetRoute })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    const { error } = this.props
    const errorText = error ? <Text color="error" children={error} /> : null

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="position">
          <Card>
            <FormLabel>Email</FormLabel>
            <FormInput
              keyboardType="email-address"
              value={this.props.email}
              onChangeText={a => this.props.setEmail(a)}
              placeholder="hello@example.com"
            />
            <FormLabel>Password</FormLabel>
            <FormInput
              secureTextEntry={true}
              value={this.props.password}
              onChangeText={a => this.props.setPassword(a)}
              placeholder="••••••••"
            />
            <Button
              title="Sign in"
              mt={2}
              fontWeight="bold"
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
            />
            <Button
              title="Reset password"
              bg="secondary"
              mt={1}
              mb={2}
              onPress={() => {
                this.props.navigation.navigate('ResetScreen')
              }}
            />
            {errorText}
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  const { email, password, token, error } = state.login
  return { email, password, token, error }
}

const mapDispatchToProps = dispatch => ({
  setEmail: a => dispatch(LoginActions.setEmail(a)),
  setPassword: a => dispatch(LoginActions.setPassword(a)),
  login: () => dispatch(login()),
  reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
