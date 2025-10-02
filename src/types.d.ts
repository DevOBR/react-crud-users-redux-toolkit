export type UserId = string
export type UserDto = { name: string; country: string }
export type User = UserDto & { id: UserId }
