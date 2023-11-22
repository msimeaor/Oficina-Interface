import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Person } from '../../Images/person-solid.svg'
import 'bootstrap/dist/css/bootstrap.min.css'

const HomeScreen = ({ setCurrentPage }) => {

  React.useEffect(() => {
    setCurrentPage('Bem Vindo!')
  }, [setCurrentPage])

  return (
    <section className='container' >
      <div className='row mt-5' >
        <div className='col-lg-2 col-md-3 col-4 pt-2 pb-2' >
          <Link className='d-flex flex-wrap justify-content-center' >
            <Person/>
            <h5 className='mt-2' >
              Pessoas
            </h5>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HomeScreen