export type Game = {
  gameId: string,
  players: Player[]
}

export type Player = {
  name: string
}

export enum Events {
  CreateGame = 'create game',
  LoadGame = 'load game',
  JoinGame = 'join room',
  LeaveGame = 'leave room',
  AddPlayer = 'add player'
}

export type NullableString = string | null
export type NullableGame = Game | null

export type RouteParams = { gameId: string }
