import { useState, FormEvent, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { UserStore } from '../../../store/userStore'
import { logUser } from '../services/auth.service'
import { useNavigate } from 'react-router-dom'
import { IUser } from '../../../models/user'
import { useCookies } from 'react-cookie'

const theme = createTheme()

const LoginForm = () => {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
	}

	const goTo = useNavigate()
	const { setAuth, isAuth, logoutHandler } = UserStore()
	const [cookies, setCookie] = useCookies(['user'])
	const [loginData, setLoginData] = useState({ email: '', password: '' })
	const [foundUser, setFoundUser] = useState<IUser>({ id: '0', email: '', password: '', username: '' })

	const emailHandler = (value: string) => setLoginData({ ...loginData, email: value })
	const passwordHandler = (value: string) => setLoginData({ ...loginData, password: value })

	const loginHandler = () => {
		logUser(loginData.email, loginData.password, setFoundUser)
	}

	useEffect(() => {
		if (foundUser.id != '0') {
			//localStorage.setItem('userID', foundUser.id)
			setCookie('user', foundUser, { path: '/' })
			setAuth(foundUser)
			setFoundUser({ ...foundUser, id: '0' })
		}
	}, [foundUser])

	return (
		<ThemeProvider theme={theme}>
			{isAuth ? (
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<Button fullWidth variant='contained' sx={{ mt: 3, mb: 2, maxWidth: '300px' }} onClick={logoutHandler}>
						logout
					</Button>
				</Box>
			) : (
				<Container component='main' maxWidth='xs'>
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
							<TextField
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								autoFocus
								onChange={(e) => emailHandler(e.target.value)}
								value={loginData.email}
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								onChange={(e) => passwordHandler(e.target.value)}
								value={loginData.password}
							/>

							<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} onClick={loginHandler}>
								Sign in
							</Button>
							<Grid container>
								<Grid item xs></Grid>
								<Grid item>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			)}
		</ThemeProvider>
	)
}

export default LoginForm