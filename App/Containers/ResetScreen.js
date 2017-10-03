import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { FormInput, FormLabel } from 'react-native-elements'
import { Card, Text, Button } from '../UI'
import LoginActions, { reset } from '../Redux/LoginRedux'

const successMessage =
  'Your password was successfully reset. Check your email for a link on reset it.'

class ResetScreen extends Component {
  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: targetRoute })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    var error = null
    if (this.props.error == successMessage) {
      error = <Text color="black">{this.props.error}</Text>
    } else if (this.props.error) {
      error = <Text color="error">{this.props.error}</Text>
    }

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="position">
          <Card>
            <FormLabel>
              Enter your email. If it matches an account, a reset password link
              will be sent to you.
            </FormLabel>
            <FormInput
              keyboardType="email-address"
              value={this.props.email}
              onChangeText={a => this.props.setEmail(a)}
            />
            <Button
              onPress={() => {
                this.props
                  .reset()
                  .then(this.props.setError(successMessage))
                  .catch(() => {})
              }}
              title="Reset Password"
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
  const { email, error } = state.login
  return { email, error }
}

const mapDispatchToProps = dispatch => ({
  setEmail: a => dispatch(LoginActions.setEmail(a)),
  setError: a => dispatch(LoginActions.setError(a)),
  reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetScreen)
