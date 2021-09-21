import React from  'react'
import Footer from '../components/Footer'

export const NotFoundPage = () => {

    return (
        <>
            <div className="col s10 m10">
                <br /><br/><h3 className="red-text text-lighten-2">&nbsp;Извините, похоже, что такой страницы не существует :(</h3>
            </div>
            <Footer />
        </>
            
    )
}
export default NotFoundPage