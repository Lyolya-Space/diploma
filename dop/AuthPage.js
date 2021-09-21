import React,  { useState, useEffect } from "react"
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {

    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        org_name:'gcjgcfjgh', name:'sdfd', email: 'dvfdsv@jhc.jjj', phone:'dsvfddvfddsfsd', password: 'dfdfrdfr'
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.AutoInit()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const orgRegisterHandler = async () => {
        try {
             const data = await request('https://safe-citadel-18580.herokuapp.com/', 'POST', { ...form })
            //await request('https://safe-citadel-18580.herokuapp.com/test', 'GET').then(console.log)
            message(data.message)
            
        } catch (e) {}
    }

    const candRegisterHandler = async () => {
        try {

        } catch (e) { }
    }

    const registerHandler = async () => {
        try {

        } catch (e) { }
    }

    const authorizationHandler = async () => {
        try {

        } catch (e) { }
    }

    return (
        <>
            <div className="row">
                <div className="col m6 red lighten-2 card hide-on-small-only" id="big_label">
                    <h4 className="white-text center"><br /> <br /><b>Веб-ресурс для проведения психометрического тестирования</b><br /><br /></h4>
                    <h5 className="white-text center">для продолжения работы необходимо зарегистрироваться или войти в систему<br /><br /><br /><br /></h5>
                </div>
                <div className="col s12 m6" id="forms">
                    <div className="row">
                        <div className="col s12">
                            <ul className="tabs">
                                <li className="tab col s6"><a className="active" href="#test1">Регистрация</a></li>
                                <li className="tab col s6"><a href="#test2">Авторизация</a></li>
                            </ul>
                        </div>

                        <div id="test1" className="col s12">
                            <ul className="collapsible">
                                <li>
                                    <div className="collapsible-header">
                                        <h6 className="center-align">Я представитель от организации</h6>
                                    </div>
                                    <div className="collapsible-body">
                                        <div className="row">
                                            <div className="input-field col s6">
                                                <input id="org_name" type="text" className="validate" value={form.org_name} onChange={changeHandler} />
                                                <label htmlFor="org_name">Название организации*</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input id="name" type="text" className="validate" value={form.name} onChange={changeHandler} />
                                                <label htmlFor="name">ФИО представителя*</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input id="email" type="email" className="validate" value={form.email} onChange={changeHandler}/>
                                                <label htmlFor="email">Электронная почта*</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input id="phone" type="text" className="validate" value={form.phone} onChange={changeHandler} />
                                                <label htmlFor="phone">Телефон</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input id="password" type="password" className="validate" value={form.password} onChange={changeHandler}/>
                                                <label htmlFor="password">Пароль*</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input id="password2" type="password" className="validate" />
                                                <label htmlFor="password2">Повторите пароль*</label>
                                            </div>
                                            <div className="col s12 center">
                                                <button
                                                    className="btn red lighten-2"
                                                    disabled={loading}
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
                                        <h6 className="center-align">Я кандидат на место в организации</h6>
                                    </div>
                                    <div className="collapsible-body">
                                        <div className="row">
                                            <span className="col s12">Введите код, высланный Вам организацией для прохождения тестирования</span>
                                            <div className="input-field col s12">
                                                <input id="code" type="text" className="validate" />
                                                <label htmlFor="code">Код кандидата</label>
                                            </div>

                                            <div className="col s12 center">
                                                <button
                                                    className="btn red lighten-2"
                                                    disabled={loading}
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
                                        <h6 className="center-align">Я хочу пройти психометрическое тестирование</h6>
                                    </div>
                                    <div className="collapsible-body">
                                        <div className="row">
                                            <div className="input-field col s6">
                                                <input id="username" type="text" className="validate" />
                                                <label htmlFor="username">Имя пользователя</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input id="useremail" type="email" className="validate" />
                                                <label htmlFor="useremail">Электронная почта</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input id="userpassword" type="password" className="validate" />
                                                <label htmlFor="userpassword">Пароль</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input id="userpassword2" type="password" className="validate" />
                                                <label htmlFor="userpassword2">Повторите пароль</label>
                                            </div>
                                            <div className="col s12 center">
                                                <button
                                                    className="btn red lighten-2"
                                                    disabled={loading}
                                                    onClick={registerHandler}
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
                                        <h6 className="center-align">Войти в систему</h6>
                                    </div>
                                    <div className="collapsible-body">
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="enter_email" type="email" className="validate" />
                                                <label htmlFor="enter_email">Электронная почта</label>
                                            </div>
                                            <div className="input-field col s12">
                                                <input id="enter_password" type="password" className="validate" />
                                                <label htmlFor="enter_password">Пароль</label>
                                            </div>
                                            <div className="col s12 center">
                                                <button
                                                    className="btn red lighten-2"
                                                    disabled={loading}
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

            </div>
            <footer className="col s12 center red-text text-lighten-2">
                © 2020 Psychometric Testing
            </footer>
         </>
    )
}