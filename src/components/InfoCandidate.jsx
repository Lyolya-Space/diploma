import React from  'react'


export const InfoCandidate = () => {

    const resetHandler = async () => {
        sessionStorage.removeItem('cand_code')
    }  

    return(
        <>
            <div className="modal-content">
                    <h4>Информация о кандидате</h4>
                    <table>
                        <tbody>
                            <tr>
                                <td><b>Код:</b></td>
                                <td id='icand_code'></td>
                            </tr>
                            <tr>
                                <td><b>ФИО:</b></td>
                                <td id='icand_name'></td>
                            </tr>
                            <tr>
                                <td><b>Предполагаемая должность:</b></td>
                                <td id='ipost'></td>
                            </tr>
                            <tr>
                                <td><b>Электронная почта:</b></td>
                                <td id='icand_email'></td>
                            </tr>
                            <tr>
                                <td><b>Номер телефона:</b></td>
                                <td id='icand_phone'></td>
                            </tr>
                            <tr>
                                <td><b>Тесты:</b></td>
                                <td id='icand_tests'></td>
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
export default InfoCandidate