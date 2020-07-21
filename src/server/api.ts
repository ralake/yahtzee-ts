import shortid from 'shortid'

const games = new Map()

export async function createGame () {
  const gameId = shortid.generate()
  const game = { gameId }

  games.set(gameId, game)

  return game
}

export async function getGame (gameId: string) {
  return games.get(gameId)
}
