import React from  'react'


export const InfoTest = () => {

    const resetHandler = async () => {
        //sessionStorage.removeItem('target')
    }  


    return(
        <>
            <div className="modal-content">
                    <h4>Информация о тесте</h4>
                    <table>
                        <tbody>
                            <tr>
                                <td><b>Название:</b></td>
                                <td id='t_name'></td>
                            </tr>
                            <tr>
                                <td><b>Описание:</b></td>
                                <td id='t_desc'></td>
                            </tr>
                            <tr>
                                <td><b>Количество вопросов:</b></td>
                                <td id='t_qnumber'></td>
                            </tr>
                            <tr>
                                <td><b>Время прохождения:</b></td>
                                <td id='t_time'></td>
                            </tr>
                        </tbody>
                    </table>
            </div>
            <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect btn-flat" onClick={resetHandler}>ОК</a>
            </div>
        </>
    )
}
export default InfoTest