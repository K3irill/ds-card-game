export const incrementGamesCount = (setStatics: any) => {
  setStatics((prev: any) => ({
    ...prev,
    gamesCount: prev.gamesCount + 1,
  }))
}

export const incrementGuessCount = (setStatics: any) => {
  setStatics((prev: any) => ({
    ...prev,
    guessCount: prev.guessCount + 1,
  }))
}

export const incrementMistakesCount = (setStatics: any) => {
  setStatics((prev: any) => ({
    ...prev,
    mistakesCount: prev.mistakesCount + 1,
  }))
}

export const updatePassage = (setStatics: any, percentage: number) => {
  setStatics((prev: any) => ({
    ...prev,
    gamePassage: percentage,
  }))
}
