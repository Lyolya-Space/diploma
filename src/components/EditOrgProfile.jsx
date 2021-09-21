import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

function EditOrgProfile() {
    const [form, setForm] = useState({
        org_id: sessionStorage.getItem('ID'),
        org_name: sessionStorage.getItem('org_name'),
        name: sessionStorage.getItem('name'),
        email: sessionStorage.getItem('email'),
        phone: sessionStorage.getItem('phone'), 
        password: ''
    })
    const history = useHistory()
 
    const { request, error, clearError} = useHttp()

    const message = useMessage()
    
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

    const saveHandler = async () => {
        try {
            console.log('saveHandler')
            if (document.getElementById('password').value === document.getElementById('password2').value
                && document.getElementById('name').value!==''
                && document.getElementById('email').value!==''
                && document.getElementById('phone').value!==''
                && document.getElementById('org_name').value!==''){
                    console.log(form)
                    await request('https://safe-citadel-18580.herokuapp.com/api/auth/orgEdit', 'POST', { ...form })
                    window.sessionStorage.setItem('name', document.getElementById('name').value)
                    window.sessionStorage.setItem('email', document.getElementById('email').value)
                    window.sessionStorage.setItem('org_name', document.getElementById('org_name').value)
                    window.sessionStorage.setItem('phone', document.getElementById('phone').value)
                    window.location.reload()
            }else{
                window.M.toast({html: 'Пароли не совпадают' })
            }
            
        } catch (e) { 
            console.log( e.message) }
    }    
    const userDel = async () => {
        const id=sessionStorage.getItem("ID")
        await request('https://safe-citadel-18580.herokuapp.com/api/auth/userDelete', 'POST', {id})
        sessionStorage.clear()
        history.push('/')
    }

    return (
        <>
            <div className="modal-content">
                    <h4>Редактирование профиля</h4>
                    <br/>
                    <div className="input-field">
                        <input 
                            id="org_name"
                            name="org_name" 
                            type="text" 
                            className="validate"
                            value={form.org_name} 
                            onChange={changeHandler}/>
                        <label htmlFor="org_name">Название организации</label>
                    </div>
                    <div className="input-field">
                        <input 
                            id="name"
                            name="name" 
                            type="text" 
                            className="validate"
                            value={form.name} 
                            onChange={changeHandler}/>
                        <label htmlFor="name">ФИО представителя от организации</label>
                    </div>
                    <div className="input-field">
                        <input 
                            id="email" 
                            name="email"
                            type="email" 
                            className="validate" 
                            value={form.email} 
                            onChange={changeHandler}/>
                        <label htmlFor="email">Электронная почта</label>
                    </div>
                    <div className="input-field">
                        <input 
                            id="phone"
                            name="phone" 
                            type="text" 
                            className="validate"
                            value={form.phone} 
                            onChange={changeHandler}/>
                        <label htmlFor="phone">Номер телефона</label>
                    </div>
                    <div className="row">
                        <div className="input-field col s6 m6">
                            <input 
                                id="password"
                                name="password" 
                                type="password"
                                className="validate"
                                value={form.password} 
                                onChange={changeHandler} />
                            <label htmlFor="password">Новый пароль</label>
                        </div>
                        <div className="input-field col s6 m6">
                            <input id="password2" type="password" className="validate" />
                            <label htmlFor="password2">Повторите пароль</label>
                        </div>
                    </div> 
                    <button onClick={userDel} className="btn-flat">Удалить пользователя</button>          
            </div>
            <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect btn-flat" onClick={saveHandler}>Сохранить</a>
                    <a href="#!" className="modal-close waves-effect btn-flat">Отмена</a>
            </div>
        </>
    );
  }
  
  export default EditOrgProfile