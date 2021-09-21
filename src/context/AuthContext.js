import { createContext } from 'react'

function noop() { }

export const AuthContext = createContext({
    type: null,
    
    user_email: null,
    user_name: null,

    userLogin: noop,
    logout: noop,
})