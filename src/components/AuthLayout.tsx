import {Routes,Route, BrowserRouter} from 'react-router-dom'
import { LoginPage, Main } from '../modules'
import { UserStore } from '../store/userStore'
import { Header } from './Header'


const AuthLayout = () => {
	const { isAuth } = UserStore()
	
	return (
		<div>
			{isAuth ? (
				<>
					<BrowserRouter>
						<Header />
						<Routes>
							<Route path='/login' Component={LoginPage} />
							<Route path='/' Component={Main} />
						</Routes>
					</BrowserRouter>
				</>
			) : (
				<>
					<BrowserRouter>
						<Header />
						<Routes>
							<Route path='/login' Component={LoginPage} />
						</Routes>
					</BrowserRouter>
				</>
			)}
		</div>
	)
}

export default AuthLayout