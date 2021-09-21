import React, { useEffect, useState } from 'react'

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'


function AuthRegForms() {

    const [orgForm, setOrgForm] = useState({
        org_name:'', name:'', email: '', phone:'', password: ''
    })

    const [candForm, setCandForm] = useState({
        code:''
    })

    const [userForm, setUserForm] = useState({
        user_name:'', user_email: '', user_password: ''
    })
    
    const [authForm, setAuthForm] = useState({
        auth_email:'', auth_password: ''
    })

    const { request, error, clearError} = useHttp()

    const message = useMessage()
    
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.AutoInit()
    }, [])

    const changeOrgHandler = event => {
        setOrgForm({ ...orgForm, [event.target.name]: event.target.value })
    }  

    const changeCandHandler = event => {
        setCandForm({ ...candForm, [event.target.name]: event.target.value })  
    }

    const changeUserHandler = event => {
        setUserForm({ ...userForm, [event.target.name]: event.target.value })
    }

    const changeAuthHandler = event => {
        setAuthForm({ ...authForm, [event.target.name]: event.target.value })
    }

    const orgRegisterHandler = async () => {
        try {
            console.log('orgRegisterHandler')
            if (document.getElementById('password').value === document.getElementById('password2').value
                && document.getElementById('org_name').value!==''
                && document.getElementById('name').value!==''
                && document.getElementById('email').value!==''
                && document.getElementById('password').value!=='') {

                const response = await request('https://safe-citadel-18580.herokuapp.com/api/auth/organizationRegister', 'POST', { ...orgForm })
                const data = await response.json()
                
                window.sessionStorage.setItem('type', data.type)
                window.sessionStorage.setItem('ID', data.org_id)
                window.sessionStorage.setItem('name', data.name)
                window.sessionStorage.setItem('org_name', data.org_name)
                window.sessionStorage.setItem('phone', data.phone)
                window.sessionStorage.setItem('email', data.email)
                
                window.location.assign('/home')
            }else{
                window.M.toast({html: 'Данные введены неверно' })
                document.getElementById('password').value=''
                document.getElementById('password2').value=''
            }
      
        } catch (e) {  console.log( e.message)}
    }

    const candRegisterHandler = async () => {
        try {
            console.log('candRegisterHandler')
            const response = await request('https://safe-citadel-18580.herokuapp.com/api/auth/candAuth', 'POST', { ...candForm })
            const data = await response.json()
            window.sessionStorage.setItem('type', data.type)
            window.sessionStorage.setItem('ID', data.cand_id)
            window.sessionStorage.setItem('code', data.code)
            window.sessionStorage.setItem('cand_name', data.cand_name)
            window.sessionStorage.setItem('cand_email', data.cand_email)
            window.sessionStorage.setItem('cand_phone', data.cand_phone)
            window.sessionStorage.setItem('post', data.post)
            window.sessionStorage.setItem('org_id', data.org_id)
            window.sessionStorage.setItem('org_name', data.org_name)
            window.location.assign('/home')
        } catch (e) { 
            console.log( e.message) }
    }

    const userRegisterHandler = async () => {
        try {
            console.log('userRegisterHandler')
            if (document.getElementById('user_password').value === document.getElementById('user_password2').value
                && document.getElementById('user_name').value!==''
                && document.getElementById('user_email').value!==''
                && document.getElementById('user_password').value!=='') {
                
                const response = await request('https://safe-citadel-18580.herokuapp.com/api/auth/userRegister', 'POST', { ...userForm })
                const data = await response.json()
                window.sessionStorage.setItem('type', data.type)
                window.sessionStorage.setItem('ID', data.user_id)
                window.sessionStorage.setItem('user_email', data.user_email)
                window.sessionStorage.setItem('user_name', data.user_name)
                window.location.assign('/home')

            }else{
                window.M.toast({html: 'Данные введены неверно' })
                document.getElementById('user_password').value=''
                document.getElementById('user_password2').value=''
            }
            
        } catch (e) { console.log('что-то пошло не так:', e.message)}
    }

    const authorizationHandler = async () => {
        try {
            console.log('authorizationHandler')
            const response = await request('https://safe-citadel-18580.herokuapp.com/api/auth/orguserAuth', 'POST', { ...authForm })
            
            const data = await response.json()

            if(data.type==='user'){
                window.sessionStorage.setItem('type', data.type)
                window.sessionStorage.setItem('ID', data.user_id)
                window.sessionStorage.setItem('user_email', data.user_email)
                window.sessionStorage.setItem('user_name', data.user_name)
                window.location.assign('/home')
            }
            if(data.type==='organization'){
                window.sessionStorage.setItem('type', data.type)
                window.sessionStorage.setItem('ID', data.org_id)
                window.sessionStorage.setItem('name', data.name)
                window.sessionStorage.setItem('org_name', data.org_name)
                window.sessionStorage.setItem('phone', data.phone)
                window.sessionStorage.setItem('email', data.email)
                window.location.assign('/home')
            }
        } catch (e) { console.log( e.message) }
    }

    return (
                <div className="col s12 m6" id="forms">
                    <div className="row">
                        <div className="col s12">
                            <ul className="tabs">
                                <li className="tab col s6"><a href="#test1">Регистрация</a></li>
                                <li className="tab col s6"><a className="active" href="#test2">Авторизация</a></li>
                            </ul>
                        </div>

                        <div id="test1" className="col s12">
                            <ul className="collapsible">
                                <li>
                                    <div className="collapsible-header">
                                        <h6 className="center-align grey-text text-darken-3">Я представитель от организации</h6>
                                    </div>
                                    <div className="collapsible-body">
                                        <div className="row">
                                            <div className="input-field col s6">
                                                <input 
                                                    id="org_name"
                                                    name="org_name" 
                                                    type="text" 
                                                    className="validate" 
                                                    value={orgForm.org_name} 
                                                    onChange={changeOrgHandler}
                                                />
                                                <label htmlFor="org_name">Название организации*</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input 
                                                    id="name" 
                                                    name="name" 
                                                    type="text" 
                                                    className="validate"  
                                                    value={orgForm.name} 
                                                    onChange={changeOrgHandler}
                                                />
                                                <label htmlFor="name">ФИО представителя*</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input 
                                                    id="email"
                                                    name="email" 
                                                    type="email" 
                                                    className="validate"
                                                    value={orgForm.email}  
                                                    onChange={changeOrgHandler}
                                                />
                                                <label htmlFor="email">Электронная почта*</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input 
                                                    id="phone"
                                                    name="phone" 
                                                    type="text" 
                                                    className="validate" 
                                                    value={orgForm.phone}   
                                                    onChange={changeOrgHandler}
                                                />
                                                <label htmlFor="phone">Телефон</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input 
                                                    id="password" 
                                                    name="password" 
                                                    type="password" 
                                                    className="validate" 
                                                    value={orgForm.password} 
                                                    onChange={changeOrgHandler}
                                                />
                                                <label htmlFor="password">Пароль*</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input id="password2" type="password" className="validate" />
                                                <label htmlFor="password2">Повторите пароль*</label>
                                            </div>
                                            <div className="col s12 center">
                                                <button
                                                    className="btn red lighten-2"
                                                    onClick={orgRegisterHandler}
                                                >
                                                    Зарегистрировать организацию
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="collapsible-header">
                                        <h6 className="center-align grey-text text-darken-3">Я кандидат на место в организации</h6>
                                    </div>
                                    <div className="collapsible-body">
                                        <div className="row">
                                            <span className="col s12">Введите код, высланный Вам организацией для прохождения тестирования</span>
                                            <div className="input-field col s12">
                                                <input 
                                                    id="code"
                                                    name="code" 
                                                    type="text" 
                                                    className="validate" 
                                                    value={candForm.code} 
                                                    onChange={changeCandHandler}/>
                                                <label htmlFor="code">Код кандидата</label>
                                            </div>

                                            <div className="col s12 center">
                                                <button
                                                    className="btn red lighten-2"
                                                    onClick={candRegisterHandler}
                                                >
                                                    Продолжить
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="collapsible-header">
                                        <h6 className="center-align grey-text text-darken-3">Я хочу пройти психометрическое тестирование</h6>
                                    </div>
                                    <div className="collapsible-body">
                                        <div className="row">
                                            <div className="input-field col s6">
                                                <input 
                                                    id="user_name" 
                                                    name="user_name" 
                                                    type="text" 
                                                    className="validate"  
                                                    value={userForm.user_name} 
                                                    onChange={changeUserHandler} />
                                                <label htmlFor="user_name">Имя пользователя</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input 
                                                    id="user_email"
                                                    name="user_email" 
                                                    type="email" 
                                                    className="validate"
                                                    value={userForm.user_email}  
                                                    onChange={changeUserHandler} />
                                                <label htmlFor="user_email">Электронная почта</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input 
                                                    id="user_password" 
                                                    name="user_password" 
                                                    type="password" 
                                                    className="validate" 
                                                    value={userForm.user_password} 
                                                    onChange={changeUserHandler}/>
                                                <label htmlFor="user_password">Пароль</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input id="user_password2" type="password" className="validate" />
                                                <label htmlFor="user_password2">Повторите пароль</label>
                                            </div>
                                            <div className="col s12 center">
                                                <button
                                                    className="btn red lighten-2"
                                                    onClick={userRegisterHandler}
                                                >
                                                    Зарегистрировать пользователя
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div id="test2" className="col s12">
                            <ul className="collapsible">
                                <li className="active">
                                    <div className="collapsible-header">
                                        <h6 className="center-align grey-text text-darken-3">Войти в систему</h6>
                                    </div>
                                    <div className="collapsible-body">
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input 
                                                    id="auth_email"
                                                    name="auth_email" 
                                                    type="email" 
                                                    className="validate"
                                                    value={authForm.auth_email}  
                                                    onChange={changeAuthHandler} />
                                                <label htmlFor="auth_email">Электронная почта</label>
                                            </div>
                                            <div className="input-field col s12">
                                                <input 
                                                    id="auth_password" 
                                                    name="auth_password" 
                                                    type="password" 
                                                    className="validate" 
                                                    value={authForm.auth_password} 
                                                    onChange={changeAuthHandler} />
                                                <label htmlFor="auth_password">Пароль</label>
                                            </div>
                                            <div className="col s12 center">
                                                <button
                                                    className="btn red lighten-2"
                                                    onClick={authorizationHandler}
                                                >
                                                    Продолжить
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
    );
  }
  
  export default AuthRegForms