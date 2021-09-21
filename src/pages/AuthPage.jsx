import React from  'react'
import TitleCard from '../components/TitleCard'
import AuthRegForms from '../components/AuthRegForms'

export const AuthPage = () => {

    return (
        <div className="row">
            <div className="col s12 m12">
                <TitleCard />
                <AuthRegForms />
            </div>
            
        </div>
    )
}
export default AuthPage