import React, {useState, useEffect} from 'react'

function CustomQuestion(props) {
    const [q_text, setq_text] = useState('')
    const [answers, setAnswers] = useState([{id: props.cid+'answer1', value: ''}, {id: props.cid+'answer2', value: ''}])
    const [_answers, set_answers] = useState([])
    const [rightAnswers, setRightAnswers] = useState([])

    
    const [_nextId, set_nextId] = useState(props.cid+'answer'+3)

    useEffect(() => {
        window.M.AutoInit()
        setq_text(q_text)
        set_answers(_answers)
        setRightAnswers(rightAnswers)
        setAnswers(answers)
        props.handle(props.cid,  q_text, _answers, rightAnswers)
    }, [ props, q_text, _answers, rightAnswers, answers])
    
    const changeHandler = event => {
        if(event.target.id === props.cid+"q_text"){
            setq_text(event.target.value)
        }
            
        if(event.target.id.startsWith(props.cid+"answer")){
            var arr = []
            answers.map(answer => {
                if(answer.id === event.target.id){
                    answer.value=event.target.value
                } 
                arr.push(answer.value)
            })
            set_answers(arr)
        }

        if(event.target.id.startsWith(props.cid+"check")){
            if(document.getElementById(event.target.id).checked===true){
                rightAnswers.push(document.getElementById(event.target.id.replace(props.cid+"check_","")).value)
            }
            if(document.getElementById(event.target.id).checked===false){
                setRightAnswers(rightAnswers.filter(answer => answer !== document.getElementById(event.target.id.replace(props.cid+"check_","")).value))
            }
        }
        
        //setForm( {...form, q_answers: _answers, q_right_answers: rightAnswers})
        //console.log(form)
        
    } 
    
    const deleteHandler = () => {
        set_nextId(props.cid+'answer'+ (parseInt(_nextId.replace(props.cid+'answer', ''))-1))
        setAnswers(answers.filter(answer => parseInt(_nextId.replace(props.cid+'answer', '')) !== answers.length))

    }
    const addHandler = () => {
        set_nextId(props.cid+'answer'+ (parseInt(_nextId.replace(props.cid+'answer', ''))+1))
        setAnswers([...answers, {id: _nextId, value:''}])
        console.log(_nextId, answers)
    }

    return (
        <>
            <div className="input-field">
                <input 
                    id={props.cid+"q_text"}
                    name={props.cid+"q_text"} 
                    type="text"
                    value={q_text} 
                    onChange={changeHandler}/>
                <label htmlFor={props.cid+"q_text"}>Текст вопроса</label>
            </div>
            <p>Введите варианты ответов, затем пометьте правильные.</p>

                    {answers.map((answer) => 
                        <label key={"key"+answer.id} >
                        <input type="checkbox" id={props.cid+"check_"+answer.id} onChange={changeHandler}/>
                        <span>
                            <div className="input-field">
                                <input 
                                    id={answer.id}
                                    name={answer.id} 
                                    type="text"
                                    value={answer.value} 
                                    onChange={changeHandler}/>
                                <label htmlFor={answer.id}>Вариант ответа</label>
                            </div>
                        </span> 
                        </label>
                    )}
                    <button className="btn white red-text text-lighten-2" onClick={deleteHandler}>Удалить вариант</button>
                    <button className="btn white red-text text-lighten-2" onClick={addHandler}>Добавить вариант</button>

        </>
    );
  }
  
  export default CustomQuestion