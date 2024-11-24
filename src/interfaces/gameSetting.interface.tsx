export interface GameSettings {
  timer: number
  difficulty: string
  cardsCount: number
  downloadImages: string
  themeImages: string
  maxMistakes: number
  category: string
}

export interface GameSettingsContextValue {
  settings: GameSettings
  setSettings: React.Dispatch<React.SetStateAction<GameSettings>>
}
//--------------------------------------------------------
export interface CommonStatistics {
  title: string
  gamesCount: number
  guessCount: number
  mistakesCount: number
}

export interface CommonStatisticsValue {
  commonStatics: CommonStatistics
  setCommonStatics: React.Dispatch<React.SetStateAction<CommonStatistics>>
}
//--------------------------------------------------------
export interface CurrentStatistics {
  title: string
  gamesCount: number
  guessCount: number
  mistakesCount: number
  gamePassage: number
}
export interface user {
  name: string
  tag: string
  img: string
  id: string
}
export interface CurrentStatisticsValue {
  currentStatistics: CurrentStatistics
  setCurrentStatistics: React.Dispatch<React.SetStateAction<CurrentStatistics>>
}
export interface UserResultData {
  date_time: string
  playing_time: number
  mistakes: number
  difficulty: string
  guesses: number
  user: string
}
export interface AppContextValue {
  settings: GameSettings
  commonStatics: CommonStatistics
  currentStatistics: CurrentStatistics
  setSettings: React.Dispatch<React.SetStateAction<GameSettings>>
  setCommonStatics: React.Dispatch<React.SetStateAction<CommonStatistics>>
  setCurrentStatistics: React.Dispatch<React.SetStateAction<CurrentStatistics>>
  userResultData: UserResultData[]
  setUserResultData: React.Dispatch<React.SetStateAction<UserResultData[]>>
  resetStats: () => void
  user: user
  setUser: React.Dispatch<React.SetStateAction<user>>
  cardsBy: 'api' | 'custom'
  setCardsBy: React.Dispatch<React.SetStateAction<'api' | 'custom'>>
  usersImageArr: string[]
  setUsersImageArr: React.Dispatch<React.SetStateAction<string[]>>
}

export interface GameContextValue {
  isStarted: boolean
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>
  isResetGame: boolean
  setIsResetGame: React.Dispatch<React.SetStateAction<boolean>>
  resetKey: number
  setResetKey: React.Dispatch<React.SetStateAction<number>>
  seconds: number
  startTimer: () => void
  resetTimer: (a: number) => void
  stopTimer: () => void
}
