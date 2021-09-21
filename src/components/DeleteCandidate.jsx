import React, { useEffect} from 'react'

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

function DeleteCandidate() {
    const { request, error, clearError} = useHttp()

    const message = useMessage()
    
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    

    const deleteHandler = async () => {
        try{
            const code = sessionStorage.getItem('cand_code')
            const response = await request('https://safe-citadel-18580.herokuapp.com/api/auth/candDelete', 'POST', { code })
            console.log(response)
            sessionStorage.removeItem('cand_code')
            window.location.reload()
        }catch(e){console.log(e.message)}
        
    }  

    const resetHandler = async () => {
        sessionStorage.removeItem('cand_code')
    }    


    return (
        <>
            <div className="modal-content">
                    <h4>Удаление кандидата</h4>
                    Вы уверены, что хотите удалить кандидата?
            </div>
            <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect btn-flat" onClick={deleteHandler}>Удалить</a>
                    <a href="#!" className="modal-close waves-effect btn-flat" onClick={resetHandler}>Отмена</a>
            </div>
        </>
    );
  }
  
  export default DeleteCandidate