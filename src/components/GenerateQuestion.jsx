import React, {useState, useEffect} from 'react'



import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

function GenerateQuestion(props) {

 
    const { request, error, clearError} = useHttp()

    const message = useMessage()
    const [t_theme, sett_theme] = useState("Количественное мышление")
    const [q_number, setq_number] = useState('2')
    
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.AutoInit()
        setq_number(q_number)
        sett_theme(t_theme)
        //console.log('useEffect',q_number,t_theme)
        props.handle(props.gid, t_theme, q_number)
    }, [q_number, t_theme])

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('select');
        window.M.FormSelect.init(elems, {});
      });
    
    const changeHandler = (event) => {
        if(event.target.id===props.gid+"q_number"){
            setq_number(event.target.value)
        }
        else{
            sett_theme(event.target.value)
        }
    } 
    


    return (
            <div className="row">
                <div className="input-field col s8">
                <select onChange={changeHandler} id={props.gid+"select"}>
                    <option id={props.gid+"option1"} value="Количественное мышление" defaultValue>Количественное мышление</option>
                    <option id={props.gid+"option2"} value="Логика">Логика</option>
                    <option id={props.gid+"option3"} value="Словестное мышление">Словестное мышление</option>
                    <option id={props.gid+"option4"} value="Английский язык">Английский язык</option>
                </select>
                <label>Тема</label>
            </div>
            <div className="input-field col s3">
                <input 
                    id={props.gid+"q_number"}
                    name={props.gid+"q_number"}
                    type="number"
                    value={q_number}
                    onChange={changeHandler}
                    min={0} max={20} />
                <label htmlFor={props.qid+"q_number"} className="active">Количество вопросов</label>
            </div>
        </div>
    );
  }
  
  export default GenerateQuestion