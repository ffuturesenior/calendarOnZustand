import { IUser } from '../models/user'
import create from 'zustand'



interface IUserState {
	user: IUser
	isAuth: boolean
	isLoading: boolean
	isError: boolean
	setAuth: (userData: IUser) => void
	logoutHandler: () => void
	setIsError: (val: boolean) => void
	setIsLoading: (val: boolean) => void
	rehostHandler: (userData: IUser) => void
}

export const UserStore = create<IUserState>()((set) => ({
	// initial state

	user: { id: '', email: '', password: '', username: '' },
	isAuth: false,
	isLoading: false,
	isError: false,
	// methods for manipulating state
	setAuth: (userData: IUser) => {
		set((state) => ({
			user: userData,
			isAuth: true
		}))
	},
	logoutHandler: () => {
		set(() => ({
			user: { id: '', email: '', password: '', username: '' },
			isAuth: false
		}))
		localStorage.removeItem('userID')
	},
	setIsError: (val: boolean) => {
		set((state) => ({
			isError: val
		}))
	},
	setIsLoading: (val: boolean) => {
		set((state) => ({
			isLoading: val
		}))
	},
	rehostHandler: (userData: IUser) => {
		set((state) => ({
			user: userData,
			isAuth: true
		}))
	}
}))
