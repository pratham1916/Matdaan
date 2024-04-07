import React from 'react'
import { createContext, useState } from 'react'

export const AuthContext = createContext();
const AuthContexProvider = ({children}) => {

    const [auth, setAuth] = useState({ isAuth: false, token: "" })

    return (
      <div>
        <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
      </div>
    )
}

export default AuthContexProvider