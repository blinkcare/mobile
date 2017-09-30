import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 16,
  marginVertical: 16,
  section: 16,
  baseMargin: 8,
  doubleBaseMargin: 16,
  smallMargin: 4,
  doubleSection: 32,
  horizontalLineHeight: 1,
  searchBarHeight: 32,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 16,
    small: 24,
    medium: 32,
    large: 48,
    xl: 64
  },
  images: {
    small: 24,
    medium: 48,
    large: 64,
    logo: 128
  }
}

export default metrics
