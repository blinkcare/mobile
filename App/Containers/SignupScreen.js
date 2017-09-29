import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Button } from 'react-native'
import { connect } from 'react-redux'
import { Card, FormInput, FormLabel } from 'react-native-elements'
import Parse from 'parse/react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import LoginActions, { signup, login } from '../Redux/LoginRedux'

// Styles
import styles from './Styles/SignupScreenStyle'

class SignupScreen extends Component {
  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: targetRoute })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    var mismatch = null
    if (this.props.passmismatch) {
      mismatch = (
        <Text style={styles.errorText}>
          There was a mismatch of the passwords.
        </Text>
      )
    }

    var error = null
    if (this.props.error) {
      error = <Text style={styles.errorText}>{this.props.error}</Text>
    }

    return (
      <ScrollView style={styles.container}>
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
              onChangeText={text => {
                if (this.props.password === this.props.passwordtwo) {
                  this.props.setMismatch(false)
                } else {
                  this.props.setMismatch(true)
                }
                this.props.setPassword(text)
              }}
            />
            <FormLabel>Confirm Password</FormLabel>
            <FormInput
              secureTextEntry={true}
              value={this.props.passwordtwo}
              onChangeText={text => {
                if (this.props.password === this.props.passwordtwo) {
                  this.props.setMismatch(false)
                } else {
                  this.props.setMismatch(true)
                }
                this.props.setPasswordTwo(text)
              }}
            />
            <FormLabel>Email</FormLabel>
            <FormInput
              keyboardType="email-address"
              value={this.props.email}
              onChangeText={text => this.props.setEmail(text)}
            />
            <Button
              onPress={() => {
                if (this.props.password === this.props.passwordtwo) {
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
              title="Submit"
              style={styles.signup}
            />
            {mismatch}
            {error}
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.login.username,
    password: state.login.password,
    passwordtwo: state.login.passwordtwo,
    passmismatch: state.login.passmismatch,
    email: state.login.email,
    error: state.login.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUsername: username => dispatch(LoginActions.setUsername(username)),
    setPassword: password => dispatch(LoginActions.setPassword(password)),
    setPasswordTwo: password2 =>
      dispatch(LoginActions.setPasswordTwo(password2)),
    setEmail: email => dispatch(LoginActions.setEmail(email)),
    signup: () => dispatch(signup()),
    login: () => dispatch(login()),
    setMismatch: status => dispatch(LoginActions.setMismatch(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
