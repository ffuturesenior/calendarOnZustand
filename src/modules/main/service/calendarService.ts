
import axios from 'axios'
import { IUser } from '../../../models/user'
import { UserStore } from '../../../store/userStore'




export const getOneUser =  async(id:string|null,setFoundUser:Function,setIsLoading:Function,setIsError:Function) => {
    try {
        setIsLoading(true)
		const response = await axios.get<IUser[]>('./users.json')
        const foundUser=response.data.filter((p)=>{
            if(p.id==id) return p
        })
        console.log(foundUser)
        if(foundUser.length==0){
            throw Error('undef')
        }
		setFoundUser(foundUser[0])
        setIsLoading(false)
	} catch (error) {
        setIsError(true)
		console.log('user id undef')
	}
}