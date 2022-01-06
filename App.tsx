import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TipProvider, { Tip, showTip } from 'react-native-tip'
import * as Animatable from 'react-native-animatable'
import { questions } from './constants';
import AnswerSelect from './SelectAnswerButton'
import { formatQuestionString } from './utils'

export default function App() {
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isOptionPicked, setIsOptionPicked] = useState(false)
  const [animatedContainerStyles, setAnimatedContainerStyles] = useState({
    container: {},
    buttonContainer: {},
    buttonText: {}
  })

  const currentQuestion = questions[currentQuestionIndex]

  const handleOptionSelect = (text: string, keyword: string) => {
    setSelectedAnswer(text)
    setIsOptionPicked(true)
    if (text === keyword) {
      setIsAnswerCorrect(true)
      setAnimatedContainerStyles({
        container: {
          backgroundColor: '#0FDFEA'
        },
        buttonContainer: {
          backgroundColor: 'rgb(255,255,255)'
        },
        buttonText: {
          color: '#0FDFEA'
        }
      })
    } else {
      setAnimatedContainerStyles({
        container: {
          backgroundColor: '#FE7D88'
        },
        buttonContainer: {
          backgroundColor: 'rgb(255,255,255)'
        },
        buttonText: {
          color: '#FE7D88',
        }
      })
    }
  }

  const handleButtonPress = () => {
    setIsOptionPicked(false)
    setIsAnswerCorrect(false)
    setAnimatedContainerStyles({
      container: {},
      buttonContainer: {},
      buttonText: {}
    })
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1 ?? currentQuestionIndex)
    } else {
      setCurrentQuestionIndex(0)
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>Fill in the missing word</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.textToTranslate}>
            {currentQuestion.englishText}
          </Text>
          <Text style={styles.textChallenge}>
            {formatQuestionString(currentQuestion)}
          </Text>
        </View>
        <View style={styles.buttonsWrapper}>
          {currentQuestion.answerOptions.map((item, index) => (
            <AnswerSelect 
              text={item} 
              key={index} 
              handlePress={() => handleOptionSelect(item, currentQuestion.keyword)}
              disabled={!!isOptionPicked}
              containerStyle={item === selectedAnswer && animatedContainerStyles.container}
            />
          ))}
        </View>
        {isOptionPicked && (
          <Animatable.View animation="slideInUp" style={[styles.bottomContainer, animatedContainerStyles.container]}>
           {isAnswerCorrect ? (
              <Text style={styles.appraisalText}>Great Job!</Text>
           ) : (
              <Text style={styles.appraisalText}>Answer: {currentQuestion.keyword}</Text>
           )}
          <TouchableOpacity 
            disabled={!isOptionPicked} 
            style={[styles.continueButton, animatedContainerStyles.buttonContainer]} 
            onPress={handleButtonPress}
          >
            <Text style={[styles.buttonText, { opacity: 1, ...animatedContainerStyles.buttonText }]}>
              {currentQuestionIndex === questions.length - 1 ? (
                'START AGAIN'
              ) : (
                'CONTINUE'
              )}
            </Text>
          </TouchableOpacity>
        </Animatable.View>
        )}
      </View>
      <TipProvider />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#77DAFF',
  },
  contentContainer: {
    backgroundColor: '#3C6D82',
    height: '100%',
    width: '100%',
    top: 150,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    paddingVertical: 100,
  },
  headerText: {
    color: 'rgba(255,255,255, 0.9)'
  },
  textToTranslate: {
    color: 'rgba(255,255,255, 0.9)',
    fontSize: 30,
    fontWeight: '400',
    marginTop: 20,
    textAlign: 'center'
  },
  keyword:  {
    fontWeight: '900',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid'
  },
  textChallenge: {
    fontSize: 20,
    marginTop: 30,
    color: 'rgba(255,255,255, 0.9)',
    textAlign: 'center'
  },
  dottedUnderline: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
  },
  buttonsWrapper: {
    flexDirection: 'row-reverse',
    width: '90%',
    flexWrap: 'wrap',
    marginTop: 40,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  continueButton: {
    backgroundColor: '#6492A6',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 30,
    marginTop: 'auto',
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 10, width: 5 },
    shadowOpacity: 0.2
  },
  buttonText: {
    color: 'rgb(255,255,255)',
    fontWeight: '900'
  },
  bottomContainer: {
    width: '100%',
    backgroundColor: '#0FDFE7',
    marginTop: 'auto',
    paddingHorizontal: 30,
    borderRadius: 20,
    height: '33%',
    paddingTop: 20,
    paddingBottom: 80
  },
  appraisalText: {
    color: 'rgb(255,255,255)',
    fontWeight: '700',
    fontSize: 18
  }
});
