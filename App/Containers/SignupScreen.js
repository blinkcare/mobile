import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { FormInput, FormLabel } from 'react-native-elements'
import { Card, Text, Button } from '../UI'
import { scale } from '../UI/theme'
import Parse from 'parse/react-native'
import LoginActions, { signup, login } from '../Redux/LoginRedux'
import { NavigationActions } from 'react-navigation'
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
            <FormInput
              value={name}
              onChangeText={a => {
                this.props.setError('')
                this.props.setName(a)
              }}
            />
            <FormLabel>Email</FormLabel>
            <FormInput
              keyboardType="email-address"
              value={email}
              onChangeText={a => {
                this.props.setError('')
                this.props.setEmail(a)
              }}
              autoCapitalize="none"
            />
            <FormLabel>
              Password (Must contain at least 8 characters, with 1 lowercase
              character, 1 uppercase character, and 1 digit)
            </FormLabel>
            <FormInput
              secureTextEntry={true}
              value={password}
              onChangeText={a => {
                this.props.setError('')
                this.props.setPassword(a)
                this.checkMismatch(a, this.props.passwordtwo)
              }}
            />
            <FormLabel>Confirm Password</FormLabel>
            <FormInput
              secureTextEntry={true}
              value={passwordtwo}
              onChangeText={a => {
                this.props.setError('')
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
                      this.props.setError(
                        'Now verify your email by clicking on the link in the email sent to you.'
                      )
                    })
                    .catch(() => {})
                } else {
                  this.props.setMismatch(true)
                }
              }}
              title="Create account"
              disabled={passmismatch}
              buttonStyle={{marginVertical: scale[1]}}
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
  setMismatch: status => dispatch(LoginActions.setMismatch(status)),
  setError: error => dispatch(LoginActions.setError(error))
})
export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
