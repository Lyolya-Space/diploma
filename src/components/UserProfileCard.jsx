import React, { useState, useEffect, useCallback } from  'react'
import nophoto from '../images/nophoto.png'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import EditUserProfile from './EditUserProfile';
import Plot from './Plot';
function UserProfileCard() {
    const { loading, request, error, clearError} = useHttp()

    const message = useMessage()
    var i=0
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    const [tests, setTests] = useState([])
    const [standartTests, setStandartTests] = useState([])
    const [results, setResults] = useState([]) 
    const [stResults, setStResults] = useState([])
    
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        window.M.Modal.init(elems, {});
      });

      useEffect(() => {
        window.M.AutoInit()
    }, [])
    
    useEffect(() => {
        var t =[]
        var st =[]
        standartTests.forEach(
            test => {
                test.t_results.forEach(
                    result => {
                        if(result.t_id===sessionStorage.getItem('ID')){
                            var name = test.t_name
                            var res = result.t_result
                            st.push({name, res})
                        }  
                    }
                )
            }
        )
        setStResults(st)
        tests.forEach(
            test => {
                test.t_results.forEach(
                    result => {
                        if(result.t_id===sessionStorage.getItem('ID')){
                            var name = test.t_name
                            var res = result.t_result
                            t.push({name, res})
                        }    
                    }
                )
            }
        )
        setResults(st.concat(t))
    }, [standartTests, tests])
    
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


    return (
        <>            
            <div id="modal1" className="modal">
                <EditUserProfile />         
            </div>
            <div id="modal2" className="modal">
                <div className="modal-content">
                    <h4>Статистика пользователя</h4>
                    <div className="row">
                        {
                        stResults.map(st => {
                            return(<div key={i++} className="col s6">
                                <Plot testName={st.name} result={st.res} tests={standartTests}/>
                            </div>)
                        })  
                    }
                    </div>
                       
                    {/* <p>A bunch of text</p>
                    <Plot /> */}
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Закрыть</a>
                </div>         
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
                                        <h5>Привет, {sessionStorage.getItem("user_name")}!</h5>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                         
                         <div className="card-stacked">
                             <div className="card-content">
                                <table className="table_blank">
                                    <tbody>
                                    <tr>
                                        <td><b>Имя:</b></td>
                                        <td>{sessionStorage.getItem("user_name")}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Электронная почта:</b></td>
                                        <td>{sessionStorage.getItem("user_email")}</td>
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
                                <h5>Мои результаты</h5>
                                <table className="striped">
                                    <tbody>
                                    {results.map(result => {
                                            return(
                                                <tr key={i++}>
                                                    <td>{result.name}</td>
                                                    <td>{result.res}%</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <h5>Мои тесты</h5>
                                <table className="striped">
                                    <tbody>
                                        {tests.map(test => {
                                            return(
                                                <tr key={i++}>
                                                    <td width="50%">{test.t_name}</td>
                                                    <td><a href="/testing" className="red-text text-lighten-2">Пройти >></a></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                             </div>
                             <div className="card-action align_right">
                                <a className="red-text text-lighten-2 modal-trigger" href="#modal2">Посмотреть статистику</a>
                             </div>
                         </div>
                     </div>
                </div>
            </div>      
        </>
    );
  }
  
  export default UserProfileCard
