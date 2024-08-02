import React,{useEffect} from 'react';
import { UserStore } from './store/userStore';
import AuthLayout from './components/AuthLayout';
import { rehostReq } from './modules/login/services/auth.service';
import { useCookies } from 'react-cookie';

function App() {
    const { isAuth, isError, isLoading, rehostHandler } = UserStore()
    const [cookie,setCookie]=useCookies(['user'])
    useEffect(() => {
      rehostReq(rehostHandler,cookie.user)
    }, [])
  
    return isLoading ? (
      <>loading</>
    ) : isError ? (
      <>error</>
    ) : (
      <>
        <AuthLayout />
      </>
    )
}

export default App;
