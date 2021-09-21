import React, {useEffect} from 'react'

import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

import del from '../images/del.png'
import edit from '../images/edit.png'
import info from '../images/info.png'
import add from '../images/add.png'

import EditCandidate from '../components/EditCandidate'
import InfoCandidate from '../components/InfoCandidate'
import AddTest from '../components/AddTest'

export const CandidatesList = ({ candidates }) => {

    const { request, error, clearError} = useHttp()

    const message = useMessage()
    
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        window.M.Modal.init(elems, {});
      });

      useEffect(() => {
        window.M.AutoInit()
    }, [])

    const setId = async () => {
        sessionStorage.setItem('cand_code', window.event.target.name)
    }

    const setData = async () => {
        try {               
            sessionStorage.setItem('cand_code', window.event.target.name)
            const code = sessionStorage.getItem('cand_code')
            const fetched = await request('https://safe-citadel-18580.herokuapp.com/api/auth/candFindOne', 'POST', {code})
            const candidate = await fetched.json()
            document.getElementById('ecand_name').setAttribute('value', candidate.cand_name)
            document.getElementById('ecand_email').setAttribute('value', candidate.cand_email)
            document.getElementById('ecand_phone').setAttribute('value', candidate.cand_phone)
            document.getElementById('epost').setAttribute('value', candidate.post)         
        } catch (e) { 
            console.log( e.message) }
    }

    const setInfoData = async () => {
        try {               
            sessionStorage.setItem('cand_code', window.event.target.name)
            const code = sessionStorage.getItem('cand_code')
            const fetched = await request('https://safe-citadel-18580.herokuapp.com/api/auth/candFindOne', 'POST', {code})
            const candidate = await fetched.json()
            document.getElementById('icand_code').innerHTML = code
            document.getElementById('icand_name').innerHTML = candidate.cand_name
            document.getElementById('icand_email').innerHTML = candidate.cand_email
            document.getElementById('icand_phone').innerHTML = candidate.cand_phone
            document.getElementById('ipost').innerHTML = candidate.post 
            var str=''
            candidate.tests.forEach(async test => {
                
               str=str+'<b>'+test.t_id+'</b>, '+test.t_deadline+'<br/>'
               const t_name=test.t_id
                var creator = sessionStorage.getItem("ID")
                var fetched = await request('https://safe-citadel-18580.herokuapp.com/api/test/findOneTest', 'POST', {t_name, creator})
                var results = await fetched.json()
                if (results===null){
                    creator = 'standart'
                    fetched = await request('https://safe-citadel-18580.herokuapp.com/api/test/findOneTest', 'POST', {t_name, creator})
                    results = await fetched.json()
                }
                if(results!==null){
                    results.t_results.forEach(res => {
                    if(res.t_id===code){
                        str+='[ПРОЙДЕН: '+res.t_result+'%]'
                        return
                    }
                })
                }
                
            })  
            document.getElementById('icand_tests').innerHTML = str
        } catch (e) { 
            console.log( e.message) }
    }

      if (!candidates.length) {
        return (<>
             <h4 className="center">Кандидатов пока нет</h4> 
             <h4 className="center"><a className="red-text text-lighten-2 modal-trigger" href="#modalCreate">Добавить >></a></h4> 
             </>
        )
       
      }


    return (
        <>   
            <div id="modalEdit" className="modal">
                <EditCandidate/>
            </div>
            
            
            <div id="modalInfo" className="modal">
                <InfoCandidate/> 
            </div>
            <div id="modalAddTest" className="modal">
                <AddTest/> 
            </div>
            <ul className="collection with-header">
                <li className="collection-header">
                    <h4>Список кандидатов<a className=" btn white-text red lighten-2 modal-trigger secondary-content" href="#modalCreate">Новый кандидат</a></h4>
                    
                    </li>
                { candidates.map((candidate) => {
                return(
                    <li key={candidate._id} className="collection-item">
                        <div>
                            {candidate.cand_name}, {candidate.post}
                            <button data-target="modalDelete" className="white modal-trigger secondary-content tooltipped" data-position="top" data-tooltip="Удалить" onClick={setId}>
                                <img name={candidate.code} width="20px" src={del} alt="description"/>
                            </button>
                            <button data-target="modalEdit" className="white modal-trigger secondary-content tooltipped" data-position="top" data-tooltip="Редактировать" onClick={setData}>
                                <img name={candidate.code} width="20px" src={edit} alt="description2"/>
                            </button>
                            <button data-target="modalInfo" className="white modal-trigger secondary-content tooltipped" data-position="top" data-tooltip="Информация" onClick={setInfoData}>
                                <img name={candidate.code} width="20px" src={info} alt="description3"/>
                            </button> 
                            <button data-target="modalAddTest" className="white modal-trigger secondary-content tooltipped" data-position="top" data-tooltip="Назначить тесты" onClick={setInfoData}>
                                <img name={candidate.code} width="20px" src={add} alt="description4"/>
                            </button>                             

                        </div>
                    </li>
                )
            }) }              
            </ul>
        </>
    );
  }
  export default CandidatesList