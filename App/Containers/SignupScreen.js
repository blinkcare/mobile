import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { FormInput, FormLabel } from 'react-native-elements'
import { Card, Text, Button } from '../UI'
import Parse from 'parse/react-native'
import LoginActions, { signup, login } from '../Redux/LoginRedux'
import styled from 'styled-components/native'

class SignupScreen extends Component {
  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: targetRoute })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  checkMismatch(e) {
    const one = this.props.password
    const two = this.props.passwordtwo
    if (one !== two && one.length > 4 && two.length > 4) {
      this.props.setMismatch(true)
    } else {
      this.props.setMismatch(false)
    }
  }

  render() {
    const {
      error,
      passmismatch,
      email,
      username,
      password,
      passwordtwo
    } = this.props

    const mismatchText = passmismatch ? (
      <Text color="error" mt={1} ml={2}>
        Confirmation doesn’t match original 😬
      </Text>
    ) : null
    const errorText = error ? <Text color="error">{error}</Text> : null
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="position">
          <Card>
            <FormLabel>Username</FormLabel>
            <FormInput
              value={username}
              onChangeText={a => this.props.setUsername(a)}
            />
            <FormLabel>Password</FormLabel>
            <FormInput
              secureTextEntry={true}
              value={password}
              onChangeText={a => {
                this.checkMismatch()
                this.props.setPassword(a)
              }}
            />
            <FormLabel>Confirm Password</FormLabel>
            <FormInput
              secureTextEntry={true}
              value={passwordtwo}
              onChangeText={a => {
                this.checkMismatch()
                this.props.setPasswordTwo(a)
              }}
            />
            {mismatchText}
            <FormLabel>Email</FormLabel>
            <FormInput
              keyboardType="email-address"
              value={email}
              onChangeText={a => this.props.setEmail(a)}
            />
            <Button
              onPress={() => {
                if (password === passwordtwo) {
                  Parse.User.currentAsync().then(out => {
                    if (out) {
                      Parse.User.logOut()
                    }
                  })
                  this.props
                    .signup()
                    .then(() => {
                      this.resetNavigation('MainScreen')
                    })
                    .catch(() => {})
                } else {
                  this.props.setMismatch(true)
                }
              }}
              title="Create account"
              disabled={passmismatch}
              my={2}
            />
            {errorText}
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}
const mapStateToProps = state => {
  const {
    username,
    password,
    passwordtwo,
    passmismatch,
    email,
    error
  } = state.login
  return { username, password, passwordtwo, passmismatch, email, error }
}
const mapDispatchToProps = dispatch => ({
  setUsername: username => dispatch(LoginActions.setUsername(username)),
  setPassword: password => dispatch(LoginActions.setPassword(password)),
  setPasswordTwo: password2 => dispatch(LoginActions.setPasswordTwo(password2)),
  setEmail: email => dispatch(LoginActions.setEmail(email)),
  signup: () => dispatch(signup()),
  login: () => dispatch(login()),
  setMismatch: status => dispatch(LoginActions.setMismatch(status))
})
export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
