import React, {useState, useEffect} from 'react'

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

function CreateCandidate() {
    const [form, setForm] = useState({
        org_id: sessionStorage.getItem('ID'),
        code: '',
        cand_name: '',
        cand_email: '',
        cand_phone: '', 
        post: '',
       // tests: [{t_id: '', t_deadline: ''}]
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
    
    function randomCode(){
        return Math.floor(Math.random() * 900000 + 100000)
    }

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    } 

    const saveHandler = async () => {
        try {
            console.log('saveHandler')
            form.code = randomCode().toString()
            if (document.getElementById('post').value !==''
                && document.getElementById('cand_name').value!==''
                && document.getElementById('cand_email').value!==''){
                    await request('https://safe-citadel-18580.herokuapp.com/api/auth/candCreate', 'POST', { ...form })
                    window.location.reload()
            }else{
                window.M.toast({html: 'Заполнены не все обязательные поля' })
            }
            
        } catch (e) { 
            console.log( e.message) }
    }    


    return (
        <>
            <div className="modal-content">
                    <h4>Новый кандидат</h4>
                    <br/>
                    <div className="input-field">
                        <input 
                            id="cand_name"
                            name="cand_name" 
                            type="text" 
                            className="validate"
                            value={form.cand_name} 
                            onChange={changeHandler}/>
                        <label htmlFor="cand_name">ФИО*</label>
                    </div>

                    <div className="input-field">
                        <input 
                            id="cand_email" 
                            name="cand_email"
                            type="email" 
                            className="validate" 
                            value={form.cand_email} 
                            onChange={changeHandler}/>
                        <label htmlFor="cand_email">Электронная почта*</label>
                    </div>
                    <div className="input-field">
                        <input 
                            id="cand_phone"
                            name="cand_phone" 
                            type="text" 
                            className="validate"
                            value={form.cand_phone} 
                            onChange={changeHandler}/>
                        <label htmlFor="cand_phone">Номер телефона</label>
                    </div>
                    <div className="input-field">
                        <input 
                            id="post"
                            name="post" 
                            type="text"
                            className="validate"
                            value={form.post} 
                            onChange={changeHandler} />
                        <label htmlFor="post">Предполагаемая должность*</label>
                    </div>            
            </div>
            <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect btn-flat" onClick={saveHandler}>Сохранить</a>
                    <a href="#!" className="modal-close waves-effect btn-flat">Отмена</a>
            </div>
        </>
    );
  }
  
  export default CreateCandidate