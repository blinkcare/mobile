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

  checkMismatch(one, two) {
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
      name,
      password,
      passwordtwo
    } = this.props

    const mismatchText = passmismatch ? (
      <Text color="error" mt={1} ml={2}>
        Confirmation doesn’t match original 😬
      </Text>
    ) : null
    const errorText = error ? (
      <Text color="error" ml={2}>
        {error}
      </Text>
    ) : null
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="position">
          <Card>
            <FormLabel>First Name</FormLabel>
            <FormInput value={name} onChangeText={a => this.props.setName(a)} />
            <FormLabel>Email</FormLabel>
            <FormInput
              keyboardType="email-address"
              value={email}
              onChangeText={a => this.props.setEmail(a)}
            />
            <FormLabel>Password</FormLabel>
            <FormInput
              secureTextEntry={true}
              value={password}
              onChangeText={a => {
                this.props.setPassword(a)
                this.checkMismatch(a, this.props.passwordtwo)
              }}
            />
            <FormLabel>Confirm Password</FormLabel>
            <FormInput
              secureTextEntry={true}
              value={passwordtwo}
              onChangeText={a => {
                this.props.setPasswordTwo(a)
                this.checkMismatch(this.props.passwordtwo, a)
              }}
            />
            {mismatchText}
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
    name,
    password,
    passwordtwo,
    passmismatch,
    email,
    error
  } = state.login
  return { name, password, passwordtwo, passmismatch, email, error }
}
const mapDispatchToProps = dispatch => ({
  setName: name => dispatch(LoginActions.setName(name)),
  setPassword: password => dispatch(LoginActions.setPassword(password)),
  setPasswordTwo: password2 => dispatch(LoginActions.setPasswordTwo(password2)),
  setEmail: email => dispatch(LoginActions.setEmail(email)),
  signup: () => dispatch(signup()),
  login: () => dispatch(login()),
  setMismatch: status => dispatch(LoginActions.setMismatch(status))
})
export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
