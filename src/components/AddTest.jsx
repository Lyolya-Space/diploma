import React, { useState, useEffect, useCallback } from  'react'

import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AddTest = () => {

    const [tests, setTests] = useState([])
    const [standartTests, setStandartTests] = useState([])
 
    const { request, error, clearError} = useHttp()

    const message = useMessage()
    
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.AutoInit()
    }, [])
    useEffect(() => {
        setTests(tests)
        setStandartTests(standartTests)
    }, [tests, standartTests])


    document.addEventListener('DOMContentLoaded', function() {
        var options = {
            defaultDate: new Date(2018,5,4),
            setDefaultDate: true,
            selectMonths: true,
            selectYears: 200, 
            format: "dd/mm/yyyy"}
        var elems = document.querySelectorAll('.datepicker');
        window.M.Datepicker.init(elems, options);
      });
    
    const fetchTests = useCallback(async () => {
        try {
          var creator = sessionStorage.getItem('ID')
          var fetched = await request('https://safe-citadel-18580.herokuapp.com/api/test/findTest', 'POST', {creator})
          var data = await fetched.json()
          setTests(data)
          creator = "standart"
          fetched = await request('https://safe-citadel-18580.herokuapp.com/api/test/findTest', 'POST', {creator})
          data = await fetched.json()
          setStandartTests(data)

        } catch (e) {console.log(e.message)}
      }, [request])

      useEffect(() => {
        fetchTests()
        
    }, [fetchTests])

    const changeHandler = event => {
        document.getElementById(event.target.getAttribute('name')).checked=!document.getElementById(event.target.getAttribute('name')).checked;
    } 

    
    const saveHandler = async () => {
        var arr = []
        try {
            tests.map(test => {
                if(document.getElementById(test.t_name+"check").checked){
                    var name = test.t_name
                    var date = document.getElementById(test.t_name+"datepicker").value
                    arr.push({t_id: name, t_deadline: date })
                    document.getElementById(test.t_name+"check").checked=false
                    document.getElementById(test.t_name+"datepicker").value=''
                }
                
            })
            standartTests.map(test => {
                if(document.getElementById(test.t_name+"check").checked){
                    var name = test.t_name
                    var date = document.getElementById(test.t_name+"datepicker").value
                    arr.push({t_id: name, t_deadline: date })
                    document.getElementById(test.t_name+"check").checked=false
                    document.getElementById(test.t_name+"datepicker").value=''
                }
            })
            
            var candidate = sessionStorage.getItem('cand_code')
            await request('https://safe-citadel-18580.herokuapp.com/api/auth/setTests', 'POST', { candidate, arr })

            window.M.toast({html: 'Тесты назначены'})


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
                    <h4>Назначить тест кандидату</h4><br/>
                    {tests.map(t => {
                            return(
                            <div key={t.t_name} className="row">
                                <div className="col s7">
                                    <input id={t.t_name+"check"} type="checkbox" value={t.t_name}/>
                                    <span onClick={changeHandler} name={t.t_name+"check"}>{t.t_name}</span><br/>
                                </div>
                                <div className="col s5">
                                    <input id={t.t_name+"datepicker"} name="datepicker" type="text" className="datepicker"/>
                                    <label htmlFor={t.t_name+"datepicker"} className="active">Крайний срок</label>
                                </div>

                            </div>)
                        })
                        }
                        {standartTests.map(st => {
                            return(
                                <div key={st.t_name} className="row">
                                    <div className="col s7">
                                        <input id={st.t_name+"check"} type="checkbox" value={st.t_name}/>
                                        <span onClick={changeHandler} name={st.t_name+"check"}>{st.t_name}</span><br/>
                                    </div>
                                    <div className="col s5">
                                        <input id={st.t_name+"datepicker"} name="datepicker" type="text" className="datepicker"/>
                                        <label htmlFor={st.t_name+"datepicker"} className="active">Крайний срок</label>
                                    </div>
    
                                </div>)
                        })
                        }

            </div>
            <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect btn-flat" onClick={saveHandler}>Сохранить</a>
                    <a href="#!" className="modal-close waves-effect btn-flat" onClick={resetHandler}>Отмена</a>
            </div>
        </>
    )
}
export default AddTest