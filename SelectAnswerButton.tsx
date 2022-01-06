import React from 'react'
import { Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'

interface AnswerSelect {
  text: string
  handlePress: () => void
  disabled?: boolean
  containerStyle?: StyleProp<ViewStyle>
}

const AnswerSelect = ({ text, handlePress, disabled, containerStyle }: AnswerSelect) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={handlePress} style={[styles.container, containerStyle]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    minWidth: 100,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    right: 0,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 10, width: 5 },
    shadowOpacity: 0.2
  },
  text: {
    color: '#3C6D82',
    fontWeight: '700'
  }
})

export default AnswerSelect
