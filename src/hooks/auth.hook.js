import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {

	const [type, setType] = useState(null)
	const [user_email, setUser_email] = useState(null)
	const [user_name, setUser_name] = useState(null)

	const userLogin = useCallback((type, user_email, user_name) => {
		
		setType(type)

		setUser_email(user_email)
		setUser_name(user_name)

		localStorage.setItem(
			storageName, 
			JSON.stringify({type, user_email, user_name}))
	}, [])


	const logout = useCallback(() => {
		
		setType(null)

		setUser_email(null)
		setUser_name(null)

		localStorage.removeItem(storageName)
	}, [])




	return {userLogin, logout}
}