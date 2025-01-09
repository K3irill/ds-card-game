import {
  CommonStatistics,
  CurrentStatistics,
} from '../interfaces/gameSetting.interface'

export const incrementGamesCountCommon = (
  setStatics: React.Dispatch<React.SetStateAction<CommonStatistics>>,
) => {
  setStatics((prev) => ({
    ...prev,
    gamesCount: prev.gamesCount + 1,
  }))
}

export const incrementGamesCountCurrent = (
  setStatics: React.Dispatch<React.SetStateAction<CurrentStatistics>>,
) => {
  setStatics((prev) => ({
    ...prev,
    gamesCount: prev.gamesCount + 1,
  }))
}

export const incrementGuessCountCurrent = (
  setStatics: React.Dispatch<React.SetStateAction<CurrentStatistics>>,
) => {
  setStatics((prev) => ({
    ...prev,
    guessCount: prev.guessCount + 1,
  }))
}

export const incrementGuessCountCommon = (
  setStatics: React.Dispatch<React.SetStateAction<CommonStatistics>>,
) => {
  setStatics((prev) => ({
    ...prev,
    guessCount: prev.guessCount + 1,
  }))
}

export const incrementMistakesCountCommon = (
  setStatics: React.Dispatch<React.SetStateAction<CommonStatistics>>,
) => {
  setStatics((prev) => ({
    ...prev,
    mistakesCount: prev.mistakesCount + 1,
  }))
}
export const incrementMistakesCountCurrent = (
  setStatics: React.Dispatch<React.SetStateAction<CurrentStatistics>>,
) => {
  setStatics((prev) => ({
    ...prev,
    mistakesCount: prev.mistakesCount + 1,
  }))
}
export const updatePassageCurrent = (
  setStatics: React.Dispatch<React.SetStateAction<CurrentStatistics>>,
  percentage: number,
) => {
  setStatics((prev) => ({
    ...prev,
    gamePassage: percentage,
  }))
}
