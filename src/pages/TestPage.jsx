import React, { useState, useEffect, useCallback } from  'react'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import Loader from '../components/Loader'
import TestTitle from '../components/TestTitle'
import TestQuestion from '../components/TestQuestion'
import TestFinal from '../components/TestFinal'
import Stopwatch from '../components/Stopwatch'

export const TestPage = () => {
    const [test, setTest] = useState({})
    
    const [themeQuestions, setThemeQuestions] = useState([])
    
    const [title, setTitle] = useState(true)
    const [final, setFinal] = useState(false)
    
    const [counter, setCounter] = useState(0)
    const [counterTheme, setCounterTheme] = useState(0)
    const [counterQuestion, setCounterQuestion] = useState(0)
    const [question, setQuestion] = useState({})
    const [loading, setLoading] =useState(true)

    const [running, setRunning] = useState(false)
    const [stopwatchTime, setStopwatchTime] = useState(1000)
    const [startTime, setStartTime] = useState()
    const [fullTime, setFullTime] = useState()
    
    const type = sessionStorage.getItem('type')
    
    const { request, error, clearError} = useHttp()

    const message = useMessage()
    
    var number = 0
    var time = ''
    if(test){
        if(test.t_questions){
    
            test.t_questions.forEach(q => {number++})
            test.t_themes.forEach(q => {number+=q.q_number})
            switch(test.t_time){
                case "-1": time='Неограничено'; break
                case "0": time=number+' минут'; break
                default: time=test.t_time+' минут'
            }
        }
    }
    

    useEffect(() => {
        message(error)
        clearError()
        setLoading(loading)
    }, [error, message, clearError, loading])
    
    useEffect(() => {
        setTest(test)
        setQuestion(question)
        setCounter(counter)
        setThemeQuestions(themeQuestions)
        //console.log(themeQuestions)
    }, [test, question, counter, themeQuestions])

    
    const fetchTest = useCallback(async () => {
        try {
          const creator = sessionStorage.getItem('creator')
          const t_name = sessionStorage.getItem('target')
          const fetched = await request('https://safe-citadel-18580.herokuapp.com/api/test/findOneTest', 'POST', {t_name,creator})
          const data = await fetched.json()
          setTest(data)
          const themes = data.t_themes
          if(themes.length!==0){
              themes.forEach(async(theme) => {
                var t_theme = theme.t_theme
                var q_number = theme.q_numer
                const fetchedQuestions = await request('https://safe-citadel-18580.herokuapp.com/api/test/findThemeQuestions', 'POST', {t_theme, q_number})
                const q = await fetchedQuestions.json()
                themeQuestions.push(q)
              })
          }
          setLoading(false)
        } catch (e) {console.log(e.message)}
      }, [request])
    
        useEffect(() => {
            fetchTest()
        }, [fetchTest])

        const startHandler = () => {
            //console.log('start')
            setCounter(1)
            if(test.t_questions.length!==0){
                setQuestion(test.t_questions[counter])
            }else{
                setCounterQuestion(1)
                setQuestion(themeQuestions[counterTheme][counterQuestion])
            }
            sessionStorage.setItem('result', 0)
            setTitle(false)
            if(test.t_time!=="-1")
                handleStart()
            
        }
        const nextHandler = async() => {
            //console.log('nextHandler')
            setCounter(counter+1)
            if (counter < (test.t_questions.length)){
                setQuestion(test.t_questions[counter])
            }else if(counter < number){
                //setCounterTheme(counterTheme+1)
                if(counterQuestion < themeQuestions[counterTheme].length-1){
                    setCounterQuestion(counterQuestion+1)
                }
                else{
                    setCounterTheme(counterTheme+1)
                    setCounterQuestion(0)
                }
                console.log(counterTheme, counterQuestion)
                setQuestion(themeQuestions[counterTheme][counterQuestion])
            }else{
                if(test.t_time!=="-1")
                    handleStop()
                setFinal(true)
                const creator = test.t_creator
                const t_name = test.t_name
                const t_id=sessionStorage.getItem('ID')
                console.log(sessionStorage.getItem('result'))
                const t_result=Math.round(sessionStorage.getItem('result')/number*100)
                await request('https://safe-citadel-18580.herokuapp.com/api/test/setResult', 'POST', {t_name, creator, t_id, t_result})
            }

        }
    
        const handleStart = () =>{
            setRunning(true)
            setStartTime(Date.now())
            if(test.t_time==="0"){
                setFullTime(parseInt(number)*60*1000)
                setStopwatchTime(parseInt(number)*60*1000)
            }else{
                setFullTime(parseInt(test.t_time)*60*1000)
                setStopwatchTime(parseInt(test.t_time)*60*1000)
            }
        }
        
        useEffect(() => {
            setStartTime(startTime)
            setFullTime(fullTime)
            setStopwatchTime(stopwatchTime)
            
        }, [startTime, stopwatchTime])
        
        useEffect(() => {
            if(stopwatchTime>0){
                setTimeout(() => {
                    if(running){
                        setStopwatchTime(startTime+fullTime-Date.now());
                    }
                        
                }, 1000);
            }else{
                if(running){
                    setCounter(number)
                nextHandler()
                }
                

            }
            
        });
        
    
    
        const handleStop = () =>{
            setRunning(false)
        }
    
        const format = (millisecons) => {
            let totalSeconds = Math.floor(millisecons/1000)
            let minutes = Math.floor(totalSeconds/60)
            let seconds = totalSeconds % 60
            
            return `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`
        }
    
    if (loading) {
        return <Loader/>
    }
    return (
        <>              
            <NavBar type={type}/>

                  {!loading && title && !final && <TestTitle handleStart={startHandler} name={test.t_name} description={test.t_description} number={number} time={time}/>}
                  {!loading && !title && !final  && <TestQuestion handleNext={nextHandler} question={question} counter={counter} number={number}/>}
                  {!loading && !title && !final && (test.t_time!=="-1") && <div align="center"><h6>Оставшееся время: {format(stopwatchTime)}</h6></div>}
                  {!loading && !title && final && <TestFinal number={number}/>}
                  
            <Footer />
        </>
    );
}

export default TestPage