import React, { Component } from 'react'
import Spinner from 'react-native-spinkit'
import { View, Text } from 'react-native'
import styles from './Styles/MorseDisplayStyle'

export default class MorseDisplay extends Component {
  render() {
    return (
      <View style={styles.textView}>
        <Text style={styles.current}>{this.props.current}</Text>
        <Text style={styles.waiting}>{this.props.waiting}</Text>
        <Spinner
          style={styles.spinner}
          isVisible={this.props.status}
          size={30}
          type="ThreeBounce"
        />
      </View>
    )
  }
}
