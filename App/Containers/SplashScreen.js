import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Button } from 'react-native'
import { connect } from 'react-redux'
import Parse from 'parse/react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SplashScreenStyle'

class SplashScreen extends Component {

  static navigationOptions = {
    title: 'Blink!'
  }

  componentDidMount() {
    console.log("Initializing")
    Parse.initialize("APPLICATION_ID")
    Parse.serverURL = 'http://192.168.100.113:1337/parse'
  }

  render () {
    return (
      <View style={styles.view}>
        <KeyboardAvoidingView behavior='position'>
          <Button onPress={() => this.props.navigation.navigate("LoginScreen")} title="Login" style={styles.login}/>
          <Button onPress={() => this.props.navigation.navigate("SignupScreen")} title="Signup" style={styles.signup}/>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
