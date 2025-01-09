import { createContext } from 'react'
import {
  GameSettingsContextValue,
  CommonStatisticsValue,
  CurrentStatisticsValue,
  AppContextValue,
  GameContextValue,
} from '../interfaces/gameSetting.interface'

export const GameSettingsContext =
  createContext<GameSettingsContextValue | null>(null)

export const CommonStatisticsContext =
  createContext<CommonStatisticsValue | null>(null)

export const CurrentStatisticsContext =
  createContext<CurrentStatisticsValue | null>(null)

export const AppContext = createContext<AppContextValue | null>(null)

export const GameContext = createContext<GameContextValue | null>(null)
