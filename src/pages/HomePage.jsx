import React from  'react'
import NavBar from '../components/NavBar'
import Parallax from '../components/Parallax'


export const HomePage = () => {
    const type = sessionStorage.getItem('type')

    return (
        <>
            <NavBar type={type}/>
            <Parallax type={type}/>
            <footer className="col s12 center red lighten-2 white-text footer">
                © 2020 Psychometric Testing
            </footer>
        </>
    );
}

export default HomePage