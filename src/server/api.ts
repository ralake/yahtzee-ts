import shortid from 'shortid'
import { Game } from '../types'

const games = new Map()

export function createGame () :Game {
  const gameId = shortid.generate()
  const game = { gameId, players: [] }

  games.set(gameId, game)
  return game
}

export function getGame (gameId: Game["gameId"]) :Game {
  return games.get(gameId)
}

export function addPlayerToGame (playerName: string, gameId: Game["gameId"]) :Game {
  const game = getGame(gameId)

  game.players.push({ name: playerName })
  games.set(gameId, game)

  return game
}
