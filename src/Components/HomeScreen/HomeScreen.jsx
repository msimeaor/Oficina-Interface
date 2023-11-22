import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const HomeScreen = ({ setCurrentPage }) => {

  React.useEffect(() => {
    setCurrentPage('Bem Vindo!')
  }, [setCurrentPage])

  return (
    <section className='container' >
      <div className='row' >
        <div className='col-lg-2 col-md-3 col-4' >
          
        </div>
        <div className='col-lg-2 col-md-3 col-4' >
          
        </div>
        <div className='col-lg-2 col-md-3 col-4' >
          
        </div>
      </div>
    </section>
  )
}

export default HomeScreen