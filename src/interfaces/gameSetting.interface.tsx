export interface GameSettings {
  timer: number
  difficulty: string
  boardSize: string
  downloadImages: string
  themeImages: string
  maxMistakes: number
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

export interface CurrentStatisticsValue {
  currentStatistics: CurrentStatistics
  setCurrentStatistics: React.Dispatch<React.SetStateAction<CurrentStatistics>>
}

export interface AppContextValue {
  settings: GameSettings
  commonStatics: CommonStatistics
  currentStatistics: CurrentStatistics
  setSettings: React.Dispatch<React.SetStateAction<GameSettings>>
  setCommonStatics: React.Dispatch<React.SetStateAction<CommonStatistics>>
  setCurrentStatistics: React.Dispatch<React.SetStateAction<CurrentStatistics>>
}

export interface GameContextValue {
  isStarted: boolean
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>
  isResetGame: boolean
  setIsResetGame: React.Dispatch<React.SetStateAction<boolean>>
  resetKey: number
  setResetKey: React.Dispatch<React.SetStateAction<number>>
  seconds: number
  startTimer: any
  resetTimer: any
  stopTimer: any
}
