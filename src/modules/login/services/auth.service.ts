import axios from 'axios'
import { IUser } from '../../../models/user'

export const logUser = async (email: string, password: string, setFoundUser: Function) => {
	try {
		const response = await axios.get<IUser[]>('./users.json')
		const userCheck = response.data.filter((p: IUser) => {
			console.log(p.email == email && p.password == password)
			if (p.email == email && p.password == password) return p
		})
		//console.log(userCheck)
		if (userCheck.length == 0) {
			throw Error('wrong email or password')
		}
		setFoundUser(userCheck[0])
	} catch (error) {
		console.log('loginErr')
	}
}

export const rehostReq = async (rehost: Function,userCookie:IUser) => {
	try {
		console.log('rehost')
		const response = await axios.get<IUser[]>('./users.json')
		const userCheck = response.data.filter((p: IUser) => {
			if (p.id === userCookie.id) return p
		})
		if (userCheck.length == 0) {
			throw Error('rehost err')
		}
		rehost(userCheck[0])
	} catch (error) {}
}
