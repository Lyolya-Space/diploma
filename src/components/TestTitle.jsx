import React from 'react'
import { useEffect } from 'react'

export const TestTitle = ({handleStart, name, description, number, time}) => {

    return (
        <>              
            <div className="row container_center" >
                <div className="col s12 m12 red lighten-2 card">
                    <div className="card col s12 m12">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <h3 align="center">{name}</h3>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                         
                         <div className="card-stacked">
                             <div className="card-content">
                                <table className="table_blank">
                                    <tbody>
                                    <tr>
                                        <td><b>Описание:</b></td>
                                        <td>{description}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Количество вопросов:</b></td>
                                        <td>{number}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Время прохождения:</b></td>
                                        <td>{time}</td>
                                    </tr>
                                    </tbody>
                                </table>
                             </div>
                             <div className="card-action align_right">
                                <a className="red-text text-lighten-2" href="#" onClick={handleStart}>Начать тест</a>
                             </div>
                         </div>
                     </div>
                </div>
            </div>   
        </>
    );
}

export default TestTitle