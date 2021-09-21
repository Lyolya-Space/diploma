import React from  'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import UserProfileCard from '../components/UserProfileCard'
import OrgProfileCard from '../components/OrgProfileCard'
import CandProfileCard from '../components/CandProfileCard'



export const ProfilePage = () => {
    const type = sessionStorage.getItem('type');

    switch(type){
        case "organization":
            return (
                <>
                    <NavBar type={type}/>
                    <OrgProfileCard />
                </>
            );

        case "candidate":
            return(
                <>
                    <NavBar type={type}/>
                    <CandProfileCard />
                </>
            )
        
        case "user":    
            return (
                <>
                    <NavBar type={type}/>
                    <UserProfileCard />
                </>
            )
        
        default: console.log('default')
    }
}

export default ProfilePage