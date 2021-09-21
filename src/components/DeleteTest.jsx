import React, { useEffect} from 'react'

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

function DeleteTest() {
    const { request, error, clearError} = useHttp()

    const message = useMessage()
    
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    

    const deleteHandler = async () => {
        try{
            const t_name = sessionStorage.getItem('target')
            var creator = sessionStorage.getItem("ID")
            const response = await request('https://safe-citadel-18580.herokuapp.com/api/test/deleteTest', 'POST', { t_name, creator })
            console.log(response)
            sessionStorage.removeItem('target')
            window.location.reload()
        }catch(e){console.log(e.message)}
        
    }  

    const resetHandler = async () => {
        sessionStorage.removeItem('target')
    }    


    return (
        <>
            <div className="modal-content">
                    <h4>Удаление теста</h4>
                    <p>Вы уверены, что хотите удалить тест?</p>
                    {(sessionStorage.getItem('type')==='organization') && <p>Будьте внимательны. Удаляемый Вами тест может быть назначен кандидатам. Перейдите в раздел "Кандидаты" и убедитесь, что тест никому не назначен или снимите его назначение.</p>}
            </div>
            <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect btn-flat" onClick={deleteHandler}>Удалить</a>
                    <a href="#!" className="modal-close waves-effect btn-flat" onClick={resetHandler}>Отмена</a>
            </div>
        </>
    );
  }
  
  export default DeleteTest