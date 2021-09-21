import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/ProfilePage'
import CandidatesPage from './pages/CanidatesPage'
import ConstructorPage from './pages/ConstructorPage'
import TestsPage from './pages/TestsPage'
import TestPage from './pages/TestPage'


import 'materialize-css'

function App() {

    // const { login, logout, userId, ready } = useAuth()
    // const isAuthenticated = false
    // const routes = useRoutes(isAuthenticated)

    // if (!ready) {
    //     return <Loader />
    // }

//     return (
//         <AuthContext.Provider value={{
//               login, logout, userId, isAuthenticated
//           }}>
//               <Router>
//                   <div className="container">
//                       {routes}
//                   </div>
//               </Router>
//         </AuthContext.Provider>
//     )
    return(
        <Router>
        <div className="app">    
                <Switch>
                    <Route exact path="/" component={AuthPage} />
                    <Route path="/home" component={HomePage} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/candidates" component={CandidatesPage} />
                    <Route path="/constructor" component={ConstructorPage} />
                    <Route path="/testing" component={TestsPage} />
                    <Route path="/test" component={TestPage} />
                    <Route component={NotFoundPage} />
                </Switch>       
        </div>
    </Router>
    )
    
 }

export default App