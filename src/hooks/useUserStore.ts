import { useAppSelector, useAppDispatch } from './storeHooks'
import {
  deleteUserById,
  addNewUser,
  editUser
} from '../Store/users/usersReducer'
import type { User, UserDto } from '../types.d'
export const useUserStore = () => {
  const users = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  const deleteUser = (id: string) => {
    dispatch(deleteUserById(id))
  }

  const addUser = ({ name, country }: UserDto) => {
    dispatch(addNewUser({ name, country }))
  }

  const editExistingUser = (user: User) => {
    dispatch(editUser(user))
  }

  return { users, deleteUser, addUser, editExistingUser }
}
