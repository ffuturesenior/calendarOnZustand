import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom"
import { UserStore } from "../store/userStore"

import {Box,AppBar,Toolbar,Typography,Button} from '@mui/material'
import { getOneUser } from '../modules/main/service/calendarService'
import { IUser } from '../models/user'


export const Header=()=>{
    const goTo = useNavigate()
	const { isAuth } = UserStore()
	const [user,setUser]=useState<IUser>({
		email:'',
		id:'',
		username:'',
		password:''
	})
	const [isLoading,setIsLoading]=useState(true)
	const [isError,setIsError]=useState(false)
	useEffect(()=>{
		getOneUser(localStorage.getItem('userID'),setUser,setIsError,setIsError)
	},[isAuth])

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Typography onClick={() => goTo('/')} variant='h6' component='div' sx={{ flexGrow: 1 }}>
						calendar,lol
					</Typography>
					<Button onClick={() => goTo('/login')} color='inherit'>
						{isAuth?
							<>{user.username}</>
						:
							<>Login</>
						}
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	)
}