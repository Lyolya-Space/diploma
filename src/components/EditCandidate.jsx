import React, { useState, useEffect } from  'react'

import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const EditCandidate = (props) => {

    const [form] = useState({
        code: '',
        cand_name: '',
        cand_email: '',
        cand_phone:  '',
        post: ''
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

    const changeHandler = event => {
        document.getElementById(event.target.id).setAttribute('value', event.target.value) 
    } 
    
    const saveHandler = async () => {
        try {
            form.code=sessionStorage.getItem('cand_code')
            form.cand_name=document.getElementById('ecand_name').getAttribute('value')
            form.cand_email=document.getElementById('ecand_email').getAttribute('value')
            form.cand_phone=document.getElementById('ecand_phone').getAttribute('value')
            form.post=document.getElementById('epost').getAttribute('value')
            
            if (document.getElementById('ecand_name').value!==''
                && document.getElementById('ecand_email').value!==''
                && document.getElementById('epost').value!==''){
                    await request('https://safe-citadel-18580.herokuapp.com/api/auth/candEdit', 'POST', { ...form })
                    window.location.reload()
            }else{
                window.M.toast({html: 'Не все поля заполнены' })
            }

            sessionStorage.removeItem('cand_code')
            
        } catch (e) { 
            console.log( e.message) }
    }   

    const resetHandler = async () => {
        sessionStorage.removeItem('cand_code')
    }   

    return(
        <>
            <div className="modal-content">
                    <h4>Редактирование данных кандидата</h4><br/>
                    <div className="input-field">
                        <input 
                            id="ecand_name"
                            name="cand_name" 
                            type="text" 
                            onChange={changeHandler}
                            className="validate"/>
                        <label htmlFor="ecand_name" className="active">ФИО</label>
                    </div>

                    <div className="input-field">
                        <input 
                            id="ecand_email" 
                            name="cand_email"
                            type="email" 
                            onChange={changeHandler}
                            className="validate" />
                        <label htmlFor="ecand_email" className="active">Электронная почта</label>
                    </div>
                    <div className="input-field">
                        <input 
                            id="ecand_phone"
                            name="cand_phone" 
                            type="text" 
                            onChange={changeHandler}
                            className="validate"/>
                        <label htmlFor="ecand_phone" className="active">Номер телефона</label>
                    </div>
                    <div className="input-field">
                        <input 
                            id="epost"
                            name="post" 
                            type="text"
                            onChange={changeHandler}
                            className="validate"/>
                        <label htmlFor="epost" className="active">Предполагаемая должность</label>
                    </div>
            </div>
            <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect btn-flat" onClick={saveHandler}>Сохранить</a>
                    <a href="#!" className="modal-close waves-effect btn-flat" onClick={resetHandler}>Отмена</a>
            </div>
        </>
    )
}
export default EditCandidate