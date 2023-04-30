import React,{useEffect} from 'react';
import { UserStore } from './store/userStore';
import AuthLayout from './components/AuthLayout';
import { rehostReq } from './modules/login/services/auth.service';

function App() {
    const { isAuth, isError, isLoading, rehostHandler } = UserStore()
  
    useEffect(() => {
      rehostReq(rehostHandler)
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
