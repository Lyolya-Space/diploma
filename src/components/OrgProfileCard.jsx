import React, { useState, useEffect, useCallback } from  'react'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import nophoto from '../images/nophoto.png'
import EditOrgProfile from './EditOrgProfile';
import DeleteTest from './DeleteTest';
function OrgProfileCard() {
    
    const { loading, request, error, clearError} = useHttp()

    const message = useMessage()
    var i=0
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    const [tests, setTests] = useState([])

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        window.M.Modal.init(elems, {});
      });

      useEffect(() => {
        window.M.AutoInit()
    }, [])

    const fetchTests = useCallback(async () => {
        try {
          var creator = sessionStorage.getItem('ID')
          var fetched = await request('https://safe-citadel-18580.herokuapp.com/api/test/findTest', 'POST', {creator})
          var data = await fetched.json()
          setTests(data)
        } catch (e) {console.log(e.message)}
      }, [request])

      useEffect(() => {
        fetchTests()
    }, [fetchTests])

    const displayTest = (event) => {
        var str =''
        //console.log(event.target.name)
        
        tests.forEach(test=>{
            if(test.t_name===event.target.name){
                str+='<h4>'+(test.t_name)+'</h4>'+'<table><tbody>'
                str+='<tr><td>'+(test.t_description)+'</td></tr>'
                str+='<tr><td><b>Психометрические темы</b><br/>'
                test.t_themes.forEach(theme => {
                    str+=theme.t_theme+' ('+ theme.q_number +' вопр.)<br/>'
                })
                
                test.t_questions.forEach(question => {
                    str+='</td></tr><tr><td>'
                    str+='<b>'+question.q_text+'</b><br/>Варианты ответов:<br/>'
                    question.q_answers.forEach(answer => {
                        str+=answer+'<br/>'
                    })
                    str+='Правильные ответы:<br/>'
                    question.q_right_answers.forEach(answer => {
                        str+=answer+'<br/>'
                    })
                    str+='</td></tr>'
                })
                str+='</td></tr>'
                
                str+='</tbody></table>'
            }
        })
        document.getElementById("display_test").innerHTML=str

    }
    const setTarget = (event) =>{
        sessionStorage.setItem('target', event.target.name)
    }

    return (
        <>            
            <div id="modal1" className="modal">
                <EditOrgProfile />         
            </div>
            <div id="modal2" className="modal">
                <div className="modal-content" id="display_test">
                    <h4>Тест</h4>
                    <p>A bunch of text</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Закрыть</a>
                </div>         
            </div>
            <div id="modaldel" className="modal">
                    <DeleteTest/>
                </div>
            <div className="row  container_center" >
                <div className="col s12 m12 red lighten-2 card horizontal">
                    <div className="card col s6 m6">
                        <table>
                            <tbody>
                                <tr>
                                    <td width="30%">
                                        <div className="card-image">
                                            <img src={nophoto} alt="profile_photo"/>
                                        </div>
                                    </td>
                                    <td>
                                        <h5>Привет, {sessionStorage.getItem("name")}!</h5>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                         
                         <div className="card-stacked">
                             <div className="card-content">
                                <table className="table_blank">
                                    <tbody>
                                    <tr>
                                        <td><b>Организация:</b></td>
                                        <td>{sessionStorage.getItem("org_name")}</td>
                                    </tr>
                                    <tr>
                                        <td><b>ФИО представителя:</b></td>
                                        <td>{sessionStorage.getItem("name")}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Электронная почта:</b></td>
                                        <td>{sessionStorage.getItem("email")}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Номер телефона:</b></td>
                                        <td>{sessionStorage.getItem("phone")}</td>
                                    </tr>
                                    </tbody>
                                </table>
                             </div>
                             <div className="card-action align_right">
                                <a className="red-text text-lighten-2 modal-trigger" href="#modal1">Редактировать профиль</a>
                             </div>
                         </div>
                     </div>
                     <div className="card col s6 m6">
                         <div className="card-stacked">
                             <div className="card-content">
                                <h5>Мои тесты</h5>
                                <table className="striped">
                                    <tbody>
                                        {tests.map(test => {
                                            return(
                                                <tr key={i++}>
                                                    <td >{test.t_name}</td>
                                                    <td><a name={test.t_name} className="red-text text-lighten-2 modal-trigger" href="#modal2" onClick={displayTest}>Просмотреть >></a></td>
                                                    <td><a name={test.t_name} className="red-text text-lighten-2 modal-trigger" href="#modaldel" onClick={setTarget}>Удалить >></a></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                             </div>
                         </div>
                     </div>
                </div>
            </div>      
        </>
    );
  }
  
  export default OrgProfileCard
