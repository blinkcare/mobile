import React, { Component } from 'react'
import { View } from 'react-native'
import { Box, Card, Text} from '../UI'
import MorseDisplay from './MorseDisplay'
import styles from './Styles/DeviceDisplayStyle'

export default class DeviceDisplay extends Component {

  render () {
    return (
      <View>
        <Box pt={3} px={2}>
            <Text fontWeight="bold" f={4} color="slate" children={this.props.deviceName} />
        </Box>
        <Card mt={0}>
          <MorseDisplay current={this.props.characters} waiting={this.props.queue} status={this.props.stat} />
        </Card>
      </View>
    )
  }
}
