import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export const TestFinal = ({number}) => {
    const [percent, setPercent]=useState(0)
    const result =sessionStorage.getItem('result')
    
    useEffect(() => {
        setPercent(result/number*100)
    }, [])
    
    return (
        <>              
            <div className="row container_center" >
                <div className="col s12 m12 red lighten-2 card">
                    <div className="card col s12 m12">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <h5 align="center">Тест завершен!</h5>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                         
                         <div className="card-stacked">
                             <div className="card-content">
                                <table className="table_blank">
                                    <tbody>
                                    <tr><td><b>Ваш результат:</b></td>
                                        <td>{percent}%</td>
                                    </tr>
                                    </tbody>
                                </table>
                             </div>
                             <div className="card-action align_right">
                                <a className="red-text text-lighten-2" href="/testing" >Перейти к списку тестов >></a>
                             </div>
                         </div>
                     </div>
                </div>
            </div>   
        </>
    );
}

export default TestFinal