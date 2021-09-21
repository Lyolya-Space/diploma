import React, {useState, useEffect} from 'react'

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { useHistory } from 'react-router-dom'

function EditUserProfile() {
    const [form, setForm] = useState({
        user_id: sessionStorage.getItem('ID'),
        user_name: sessionStorage.getItem('user_name'), 
        user_email: sessionStorage.getItem('user_email'), 
        user_password: ''
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
                && document.getElementById('email').value!==''){
                    //console.log(form)
                    await request('https://safe-citadel-18580.herokuapp.com/api/auth/userEdit', 'POST', { ...form })
                    window.sessionStorage.setItem('user_name', document.getElementById('name').value)
                    window.sessionStorage.setItem('user_email', document.getElementById('email').value)
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
                            id="name"
                            name="user_name" 
                            type="text" 
                            className="validate"
                            value={form.user_name} 
                            onChange={changeHandler}/>
                        <label htmlFor="name">Имя</label>
                    </div>
                    <div className="input-field">
                        <input 
                            id="email" 
                            name="user_email"
                            type="email" 
                            className="validate" 
                            value={form.user_email} 
                            onChange={changeHandler}/>
                        <label htmlFor="email">Электронная почта</label>
                    </div>
                    <div className="row">
                        <div className="input-field col s6 m6">
                            <input 
                                id="password"
                                name="user_password" 
                                type="password"
                                className="validate"
                                value={form.user_password} 
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
  
  export default EditUserProfile