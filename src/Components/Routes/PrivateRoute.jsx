import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
// import { AuthContext } from '../Authcontext/AuthContext'


const PrivateRoute = ({children}) => {
    // const [isAuth] = useContext(Aut
    const email = localStorage.getItem("email")
    console.log(email)
    if(!email){
      return <Navigate  to={'/login'} replace={true} />
    }
    return <>{children}</>;
 
}

export default PrivateRoute