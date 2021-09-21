import React, { useEffect, useState } from  'react'

import NavBar from '../components/NavBar'

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

import CustomQuestion from '../components/CustomQuestion'
import GenerateQuestion from '../components/GenerateQuestion'


export const ConstructorPage = () => {
    const type = sessionStorage.getItem('type')
    const [_nextId, set_nextId] = useState('Q'+0)

    const [generates, setGenerates] = useState([])
    const [customs, setCustoms] = useState([])

    const [form, setForm] = useState({
        t_name: '',
        t_description: '',
        t_time: '',
        t_themes: [],
        t_questions: [],
        t_creator: sessionStorage.getItem('ID')
    })

    const { request, error, clearError} = useHttp()

    const message = useMessage()
    
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.AutoInit()
    }, [])
    
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    
    const changeTimeHandler = event => {

        if(event.target.id === "t_time" || "radio3"){
            document.getElementById("radio1").checked=false
            document.getElementById("radio2").checked=false
            document.getElementById("radio3").checked=true
            setForm({ ...form, t_time: document.getElementById("t_time").value })
        }
        if(event.target.id === "radio2"){
            document.getElementById("radio1").checked=false
            document.getElementById("radio2").checked=true
            document.getElementById("radio3").checked=false
            setForm({ ...form, t_time: -1 })
        }
            
        
        if(event.target.id === "radio1"){
            document.getElementById("radio1").checked=true
            document.getElementById("radio2").checked=false
            document.getElementById("radio3").checked=false
            setForm({ ...form, t_time: 0 })
        }
            

    }
    
    const generateHandler = () => {
        set_nextId("GQ"+(parseInt(_nextId.match(/\d+/))+1))
        setGenerates([...generates, {id: _nextId, t_theme: '', q_number:''}])
    }
    const customHandler = () => {
        set_nextId("CQ"+(parseInt(_nextId.match(/\d+/))+1))
        setCustoms([...customs, {id: _nextId, q_theme: 'custom', q_text: '', q_answers: [], q_right_answers: []}])
    }

    const customQuestionHandler = (id, text, answers, right_answers) => {
        customs.map(q => {
            if(q.id === id){
                q.q_text=text
                q.q_answers=answers
                q.q_right_answers=right_answers
            }
        })
        // console.log(customs)
    }
    const generateQuestionHandler = (id, theme, number) => {
        generates.map(q => {
            if(q.id === id){
                q.t_theme=theme
                q.q_number=number
            }
        })
        // console.log(generates)
    }
    
    // const createHandler = async () => {
    //     await request('https://safe-citadel-18580.herokuapp.com/api/test/createQuestion', 'POST', { })
    //     window.M.toast({html: 'Вопрос создан' })
    // }
    // <button onClick={createHandler}>Создать вопрос</button> - в return

    const deleteHandler = event => {
        //console.log(event.target.name)
        generates.filter(g => g.id!==event.target.name)
        customs.filter(c => c.id!==event.target.name)
        document.getElementById(event.target.name).remove()
    }
    const saveHandler = async () => {
        
        form.t_questions=customs
        form.t_themes=generates


        if(document.getElementById("radio1").checked)
            setForm({ ...form, t_time: 0 })
        if(document.getElementById("radio2").checked)
            setForm({ ...form, t_time: -1 })
        if(document.getElementById("radio3").checked)            
            setForm({ ...form, t_time: document.getElementById('t_time').value })
            
        if(form.t_questions.length||form.t_themes.length){
            if(form.t_name!=='' && form.t_description!=='' && form.t_time!==''){

                var f1 = true
                form.t_questions.forEach(t => {
                    if(t.q_answers.length<2){
                        f1=false
                    }
                })
                if(f1){
                    var f2 = true
                    form.t_questions.forEach(t => {
                        if(!t.q_right_answers.length){
                            f2=false
                        }
                    })
                    if(f2){
                        const response = await request('https://safe-citadel-18580.herokuapp.com/api/test/createTest', 'POST', { ...form })
                        const data = await response.json()
                        // console.log(form)
                        // console.log(data)
                        window.M.toast({html: 'Тест создан'})
                    }else{window.M.toast({html: 'Вопрос должен содержать хотя бы один правильный вариант ответа'})}
                }else{window.M.toast({html: 'Вопрос должен содержать не менее двух вариантов ответов'})}  
            }else{window.M.toast({html: 'Должны быть заполнены все поля'})}  
        }else{window.M.toast({html: 'В тесте должен быть хотя бы один вопрос'})}

    }

    return (
        <>  
            <NavBar type={type}/>
            {/* <button onClick={createHandler}>Создать вопрос</button> */}
                <h3>Создать тест</h3>
                    <div className="input-field">
                        <input 
                            id="t_name"
                            name="t_name" 
                            type="text"
                            value={form.t_name} 
                            onChange={changeHandler}/>
                        <label htmlFor="t_name">Название</label>
                    </div>
                    <div className="input-field">
                        <input 
                            id="t_description"
                            name="t_description" 
                            type="text"
                            value={form.t_description} 
                            onChange={changeHandler}/>
                        <label htmlFor="t_description">Описание</label>
                    </div>
                    <div className="card">

                    </div>
                    <div className="card">
                        <div className="row wrap">
                            <div className="col s8">
                                <h4>Свои вопросы</h4>
                            </div>
                            <button className="col s4 btn red lighten-2 parent_height" onClick={customHandler} >Добавить свой вопрос</button>
                        </div>
                        {customs.map((custom) => 
                            <div key={custom.id} id={custom.id} className="row container_center_align wrap">
                                <div className="card col s12 bottom_margin_0">
                                    <CustomQuestion handle={customQuestionHandler} cid={custom.id}/>
                                </div>
                                <button name={custom.id} className="btn col s12 red lighten-2" name={custom.id} onClick={deleteHandler}>
                                    Удалить вопрос
                                </button>
                            </div>  
                        )}
                    </div>
                    <div className="card">
                        <div className="row wrap">
                            <div className="col s8">
                                <h4>Генерация вопросов</h4>
                            </div>
                            <button className="col s4 btn parent_height  red lighten-2" onClick={generateHandler}>Выбрать тему</button>
                        </div>
                        
                        
                        {generates.map((generate) => 
                            <div key={generate.id} id={generate.id} className="row container_center_align wrap">
                                <div className="card col s12 bottom_margin_0">
                                    <GenerateQuestion handle={generateQuestionHandler} gid={generate.id}/>
                                </div>
                                <button name={generate.id} className="btn col s12 red lighten-2" name={generate.id} onClick={deleteHandler}>
                                    Удалить тему
                                </button>
                                <br/><br/>
                            </div>  
                        )}
                    </div>
                    <div className="card">
                        <div className="row wrap">
                                <div className="col s5">
                                    <h4>Время прохождения</h4>
                                </div>

                                <div className="col s4">
                                    <label>
                                        <input name="group1" type="radio" id="radio1" onChange={changeTimeHandler}/>
                                        <span>Стандартное &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    </label>

                                    <label>
                                        <input name="group1" type="radio" id="radio2" onChange={changeTimeHandler}/>
                                        <span>Неограниченное &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    </label>

                                    <label>
                                        <input name="group1" type="radio" id="radio3" onChange={changeTimeHandler}/>
                                        <span>Задать:</span>
                                    </label>
                                </div>

                                <div className="input-field col s2">
                                        <input 
                                            id="t_time"
                                            name="t_time" 
                                            type="number"
                                            value={form.t_time} 
                                            onChange={changeTimeHandler}
                                            min={1} max={100}
                                            />
                                        <label htmlFor="t_time" className="active">Время в минутах</label>
                                </div>
                            </div>
                        </div>

                    <button className="btn col s12 red lighten-2 col s12 secondary-content" onClick={saveHandler}>
                        Сохранить тест
                    </button>

                    {/* <footer className="col s12 center red lighten-2 white-text footer">
                        © 2020 Psychometric Testing
                    </footer> */}
        </>
    );
}

export default ConstructorPage