export interface Question {
  englishText: string
  germanText: string
  answerOptions: string[]
  keyword: string
}

export const questions: Question[] = [
  {
    englishText: 'The house is small.',
    germanText: 'Das Hause ist klein',
    answerOptions: ['folgen', 'Schaf', 'Bereiden', 'Hause'],
    keyword: 'Hause'
  },
  {
    englishText: 'quickly ripened doesn’t hold stiff.',
    germanText: 'bald reif hält nicht steif ',
    answerOptions: ['folgen', 'reif', 'Bereiden', 'Hause'],
    keyword: 'reif'
  },
  {
    englishText: 'Only the strongest survive.',
    germanText: 'Nur die Harten kommen in den Garten',
    answerOptions: ['kommen', 'Schaf', 'Bereiden', 'Hause'],
    keyword: 'kommen'
  },
  {
    englishText: 'Everything has an end, only the sausage has two.',
    germanText: 'Alles hat ein Ende nur die Wurst hat zwei',
    answerOptions: ['folgen', 'Ende', 'Bereiden', 'Hause'],
    keyword: 'Ende'
  },
]