import React, {useEffect} from  'react'
import { useHistory } from 'react-router-dom'
import del from '../images/del.png'
import info from '../images/info.png'
import play from '../images/play.png'
import { useState } from 'react'
import { InfoTest } from './InfoTest'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import DeleteTest from './DeleteTest'


export const TestsList = ({tests, standartTests, candTests}) => {

    // document.addEventListener('DOMContentLoaded', function() {
    //     var elems = document.querySelectorAll('.modal');
    //     window.M.Modal.init(elems, {});
    //   });
      useEffect(() => {
        window.M.AutoInit()
    }, [])
    const { request, error, clearError} = useHttp()

    const message = useMessage()
    
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])


    const history = useHistory()


    const setTarget = (event) =>{
        sessionStorage.setItem('target', event.target.name)
    }

        // const deleteHandler = async () => {
        //     try{
        //         // const creator = sessionStorage.getItem('ID')
        //         // const target = sessionStorage.getItem('target')
        //         // console.log(creator, target)
        //         // // const response = await request('https://safe-citadel-18580.herokuapp.com/api/test/deleteTest', 'POST', { creator })
        //         // // console.log(response)
        //         // sessionStorage.removeItem('target')
        //         // // window.location.reload()
        //     }catch(e){console.log(e.message)}
            
        // }  
    
        // const resetHandler = async () => {
        //     //sessionStorage.removeItem('target')
        // }  
        const start = (event) => {
            console.log(event.target.name)
            sessionStorage.setItem('target', event.target.name)
            standartTests.forEach(s => {
                if(s.t_name===event.target.name)
                    sessionStorage.setItem('creator', 'standart')
            } )
            tests.forEach(t => {
                if(t.t_name===event.target.name){
                    sessionStorage.setItem('creator', sessionStorage.getItem('ID'))
                    if(sessionStorage.getItem('type')==='candidate'){
                        sessionStorage.setItem('creator', sessionStorage.getItem('org_id'))
                    }
                }
                    
            } )
            history.push('/test')
        }
        const deadline = (name) =>{
            var text = ''
            if (candTests.length!==0){
                candTests.forEach(ct => {
                    if(ct.t_id===name){
                        text = ', до '+ ct.t_deadline
                    }
                })
            }
            return (text)
        }
        const setTestInfo = async(event) => {
           var t_name = event.target.name
           var creator = sessionStorage.getItem("org_id")
           if(sessionStorage.getItem("type")==="user"){
               creator= sessionStorage.getItem("ID")
           }
           if(t_name.includes("stand")){
            t_name=t_name.slice(5)
            creator = "standart"
           }
           const fetched = await request('https://safe-citadel-18580.herokuapp.com/api/test/findOneTest', 'POST', {t_name, creator})
           const test = await fetched.json()
           if(test){
               document.getElementById("t_name").innerHTML=test.t_name
                document.getElementById("t_desc").innerHTML=test.t_description
                var qnumber = test.t_questions.length
                test.t_themes.forEach(theme => {
                    qnumber+=theme.q_number
                })
                document.getElementById("t_qnumber").innerHTML=qnumber
                var time = test.t_time
                switch(time){
                    case "0":
                        document.getElementById("t_time").innerHTML=qnumber+" минут"
                        break
                    case "-1":
                        document.getElementById("t_time").innerHTML="Неограничено"
                        break
                    default:
                        document.getElementById("t_time").innerHTML=test.t_time+" минут"
                }
           }
        }

    
    if (sessionStorage.getItem('type')==='candidate') {
        return (
            <>  
                <div id="modalInfoTest" className="modal">
                    <InfoTest/>
                </div>
                <ul className="collection with-header">
                    <li className="collection-header">
                        <h4>Тесты</h4>
                        </li>
                    { tests.map((test) => {
                    return(
                        <li key={test.t_name} className="collection-item">
                            <div>
                                {test.t_name+deadline(test.t_name)}
                                <button data-target="modalInfoTest" className="white modal-trigger secondary-content tooltipped" data-position="top" data-tooltip="Информация о тесте" onClick={setTestInfo}>
                                    <img name={test.t_name} width="20px" src={info} alt="description3"/>
                                </button> 
                                <button className="white secondary-content tooltipped" data-position="top" data-tooltip="Начать тест" onClick={start}>
                                    <img name={test.t_name} width="20px" src={play} alt="description2" />
                                </button>                                     
    
                            </div>
                        </li>
                    )
                }) } 
                { standartTests.map((standartTest) => {
                return(
                    <li key={standartTest.t_name} className="collection-item">
                        <div>
                            {standartTest.t_name+deadline(standartTest.t_name)}
                            <button data-target="modalInfoTest" className="white modal-trigger secondary-content tooltipped" data-position="top" data-tooltip="Информация о тесте" onClick={setTestInfo}>
                                <img name={"stand"+standartTest.t_name} width="20px" src={info} alt="description3"/>
                            </button> 
                            <button className="white secondary-content tooltipped" data-position="top" data-tooltip="Начать тест" onClick={start}>
                                <img name={standartTest.t_name} width="20px" src={play} alt="description2" />
                            </button>                                     

                        </div>
                    </li>
                )
            }) }              
                </ul>                
            </>
        );
    }
    return (
        <>  
                <div id="modalInfoTest" className="modal">
                    <InfoTest/>
                </div>
                <div id="modalDeleteTest" className="modal">
                    <DeleteTest/>
                </div>
            <ul className="collection with-header">
                <li className="collection-header">
                    <h4>Мои тесты</h4>
                    
                    </li>
                { tests.map((test) => {
                return(
                    <li key={test.t_name} className="collection-item">
                        <div>
                            {test.t_name}
                            <button data-target="modalDeleteTest" className="white modal-trigger secondary-content tooltipped" data-position="top" data-tooltip="Удалить тест" onClick={setTarget}>
                                <img name={test.t_name} width="20px" src={del} alt="description"/>
                            </button>
                            <button data-target="modalInfoTest" className="white modal-trigger secondary-content tooltipped" data-position="top" data-tooltip="Информация о тесте" onClick={setTestInfo}>
                                <img name={test.t_name} width="20px" src={info} alt="description3"/>
                            </button> 
                            <button className="white secondary-content tooltipped" data-position="top" data-tooltip="Начать тест" onClick={start}>
                                <img name={test.t_name} width="20px" src={play} alt="description2" />
                            </button>                                     

                        </div>
                    </li>
                )
            }) }          
            </ul>

            <ul className="collection with-header">
                <li className="collection-header">
                    <h4>Стандартные тесты</h4>
                    
                    </li>
                { standartTests.map((standartTest) => {
                return(
                    <li key={standartTest.t_name} className="collection-item">
                        <div>
                            {standartTest.t_name}
                            <button data-target="modalInfoTest" className="white modal-trigger secondary-content tooltipped" data-position="top" data-tooltip="Информация о тесте"  onClick={setTestInfo}>
                                <img name={"stand"+standartTest.t_name} width="20px" src={info} alt="description3"/>
                            </button> 
                            <button className="white secondary-content tooltipped" data-position="top" data-tooltip="Начать тест" onClick={start}>
                                <img name={standartTest.t_name} width="20px" src={play} alt="description2" />
                            </button>                                     

                        </div>
                    </li>
                )
            }) }              
            </ul>
            
        </>
    );
}

export default TestsList