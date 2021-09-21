import React from  'react'
import { useHistory } from 'react-router-dom'


export const NavBar = () => {

    const history = useHistory()
    const logoutHandler = event => {
        event.preventDefault()
        sessionStorage.clear()
        history.push('/')
    }
    
    switch(window.sessionStorage.getItem('type')){
        case "organization":
            return(
                <nav>
                    <div className="nav-wrapper">
                        <a href="/home" className="brand-logo">&nbsp;Psychometric Testing</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/candidates">Кандидаты</a></li>
                            <li><a href="/constructor">Конструктор тестов</a></li>
                            <li><a href="/profile">Профиль</a></li>
                            <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                        </ul>
                    </div>
                </nav>
            )

        case "candidate":
            return(
                <nav>
                    <div className="nav-wrapper">
                        <a href="/home" className="brand-logo">&nbsp;Psychometric Testing</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/testing">Тестирование</a></li>
                            <li><a href="/profile">Профиль</a></li>
                            <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                        </ul>
                    </div>
                </nav>
            )
        
        case "user":    
            return(
                <nav>
                    <div className="nav-wrapper">
                        <a href="/home" className="brand-logo">&nbsp;Psychometric Testing</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/testing">Тестирование</a></li>
                            <li><a href="/constructor">Конструктор тестов</a></li>
                            <li><a href="/profile">Профиль</a></li>
                            <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                        </ul>
                    </div>
                </nav>
            )
        
        default: console.log('default')
    }
}
export default NavBar