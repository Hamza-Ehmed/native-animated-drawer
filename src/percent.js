import { Dimensions } from 'react-native'

const screenWide = Dimensions.get('screen').width
const screenHigh = Dimensions.get('screen').width

export const percent = (p) => {
    return (screenWide / 100) * p
}

export const vPercent = (p) => {
    return (screenHigh / 100) * p
}
