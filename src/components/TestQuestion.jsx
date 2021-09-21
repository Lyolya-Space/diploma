import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export const TestQuestion = ({handleNext, question, counter, number}) => {
    var i = 0
    //console.log(question)
    //const [loading, setLoading]=useState(true)
    const [check, setCheck] = useState(0)
    const [totalCheck, setTotalCheck] = useState(0)
    

    
    useEffect(() => {
        sessionStorage.setItem('check', check===question.q_right_answers.length && check===totalCheck)
        //console.log(check)
    }, [check, totalCheck])

    const changeHandler = (event) => {
        //console.log(document.getElementById(event.target.id) )
        //console.log(event.target.name)
        if(document.getElementById(event.target.id).checked===true){
            question.q_right_answers.forEach(r => {
                if(event.target.name===r)
                    setCheck(check+1)
            })
            setTotalCheck(totalCheck+1)
        }
        if(document.getElementById(event.target.id).checked===false){
            question.q_right_answers.forEach(r => {
                if(event.target.name===r)
                    setCheck(check-1)
            })
            setTotalCheck(totalCheck-1)
        }
    }

    const next = () => {
        if(check===question.q_right_answers.length && check===totalCheck){
            sessionStorage.setItem('result', parseInt(sessionStorage.getItem('result'))+1)
        }
        handleNext()
        setCheck(0)
        setTotalCheck(0)
        for(let j=1; j <= i; j++){
            document.getElementById(j).checked=false
        }
    }
    // if (loading) {
    //     return <Loader/>
    // }
    
    return (
        <>              
            <div className="row container_center" >
                <div className="col s12 m12 red lighten-2 card">
                    <div className="card col s12 m12">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <h5 align="center">Вопрос {counter}/{number}</h5>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                         
                         <div className="card-stacked">
                             <div className="card-content">
                                <table className="table_blank">
                                    <tbody>
                                    <tr>
                                        <td><b>{question.q_text}</b></td>
                                    </tr>
                                    
                                    {question.q_answers.map(answer => {return(
                                        <tr key={i++}>
                                            <td >
                                                <label>
                                                    <input type="checkbox" name={answer} id={i} onChange={changeHandler}/>
                                                    <span>{answer}</span> 
                                                </label>
                                            </td>
                                        </tr>
                                    )})}
                                    
                                    </tbody>
                                </table>
                             </div>
                             <div className="card-action align_right">
                                <a className="red-text text-lighten-2" href="#" onClick={next}>Следующий вопрос</a>
                             </div>
                         </div>
                     </div>
                </div>
            </div>   
        </>
    );
}

export default TestQuestion