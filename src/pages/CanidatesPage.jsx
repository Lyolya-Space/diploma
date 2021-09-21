import React, { useState, useEffect, useCallback } from  'react'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import CandidatesList from '../components/CandidatesList'
import CreateCandidate from '../components/CreateCandidate'
import DeleteCandidate from '../components/DeleteCandidate'

import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import Loader from '../components/Loader'

export const CandidatesPage = () => {
    const type = sessionStorage.getItem('type')
    const org_id = sessionStorage.getItem('ID')

    const [candidates, setCandidates] = useState([])
    
    const { loading, request, error, clearError} = useHttp()

    const message = useMessage()
    
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        window.M.Modal.init(elems, {});
      });

    const fetchCandidates = useCallback(async () => {
        try {
          const fetched = await request('https://safe-citadel-18580.herokuapp.com/api/auth/candFind', 'POST', {org_id})
          const data = await fetched.json()
          setCandidates(data)
        } catch (e) {console.log(e.message)}
      }, [org_id, request])
    
      useEffect(() => {
        fetchCandidates()
      }, [fetchCandidates])

      if (loading) {
        return <Loader/>
      }
    return (
        <>  
            <NavBar type={type}/>
            <div id="modalCreate" className="modal">
                <CreateCandidate />         
            </div>
            <div id="modalDelete" className="modal">
                <DeleteCandidate/>  
            </div>
                  {!loading && <CandidatesList candidates={candidates}/>}
        </>
    );
}

export default CandidatesPage