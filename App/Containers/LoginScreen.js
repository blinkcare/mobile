import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Button } from 'react-native'
import { connect } from 'react-redux'
import { Card, FormInput, FormLabel } from 'react-native-elements'
import Parse from 'parse/react-native'
import { NavigationActions } from 'react-navigation'
import LoginActions, { login } from '../Redux/LoginRedux'
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  resetNavigation(targetRoute) {
    console.log('Navigating')
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: targetRoute })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    var error = null
    console.log(this.props.error)
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
              title="Submit"
              style={styles.signup}
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
