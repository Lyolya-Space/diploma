import React, { useState, useEffect, useCallback } from  'react'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import Loader from '../components/Loader'
import TestsList from '../components/TestsList'

export const TestsPage = () => {
    const type = sessionStorage.getItem('type')
    const [tests, setTests] = useState([])
    const [standartTests, setStandartTests] = useState([])
    const [candTests, setCandTests] = useState([])

    const { loading, request, error, clearError} = useHttp()

    const message = useMessage()
    
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    useEffect(() => {
        setTests(tests)
        setStandartTests(standartTests)
        //console.log(tests, standartTests)
    }, [tests, standartTests])
    useEffect(() => {
        setCandTests(candTests)
        if(tests.length!==0 || standartTests.length!==0){
            var arr = []
            candTests.forEach(ct => {
                tests.forEach(t => {
                    //console.log(t.t_name,ct.t_id)
                    if(t.t_name===ct.t_id){
                        arr.push(t)
                    }
                })  
            })
            setTests(arr)
            arr = []
            candTests.forEach(ct => {
                standartTests.forEach(t => {
                    //console.log(t.t_name,ct.t_id)
                    if(t.t_name===ct.t_id){
                        arr.push(t)
                    }
                })  
            })
            setStandartTests(arr)
            //console.log(tests, standartTests, candTests)
        }
    }, [candTests])
    
    const fetchTests = useCallback(async () => {
        try {
            var fetched, data
            var arr = []
          var creator = sessionStorage.getItem('ID')
          if(type==='candidate'){
            creator = sessionStorage.getItem('org_id')
          }
          fetched = await request('https://safe-citadel-18580.herokuapp.com/api/test/findTest', 'POST', {creator})
          data = await fetched.json()
          setTests(data)
          if(type==='candidate'){
            //console.log(data, candTests)
            // candTests.map(ct => {
              //   console.log(ct.t_id)
            //     data.forEach(t => {
            //         console.log(ct.t_id,t.t_name)
            //         if(ct.t_id===t.t_name){
            //             arr.push(t)
            //             return
            //         }
            //     })
             //})
            // setTests(arr)
            // arr=[]
             }

          creator = "standart"
          fetched = await request('https://safe-citadel-18580.herokuapp.com/api/test/findTest', 'POST', {creator})
          data = await fetched.json()
          setStandartTests(data)
        //   if(type==='candidate'){
        //     candTests.forEach(ct => {
        //         data.forEach(st => {
        //             if(ct.t_id===st.t_name){
        //                 arr.push(st)
        //                 return
        //             }
        //         })
        //     })
        //     setTests(arr)
            
        //     }
        if(type==='candidate'){
            var code = sessionStorage.getItem('code')
            fetched = await request('https://safe-citadel-18580.herokuapp.com/api/auth/candFindOne', 'POST', {code})
            data = await fetched.json()
            setCandTests(data.tests)
        }
        } catch (e) {console.log(e.message)}
      }, [request])
    
        useEffect(() => {
            fetchTests()

        }, [fetchTests])
    
        // const createQuestion = async () => {
        //     const fetched = await request('https://safe-citadel-18580.herokuapp.com/api/test//createQuestion', 'POST', {})
        //     const data = await fetched.json()
        //     console.log(data)
        // }
    if (loading) {
        return <Loader/>
    }
    return (
        <>              
            <NavBar type={type}/>
                {/* <button onClick={createQuestion}>создать вопрос</button> */}
                  {!loading && <TestsList tests={tests} standartTests={standartTests} candTests={candTests}/>}
        </>
    );
}

export default TestsPage