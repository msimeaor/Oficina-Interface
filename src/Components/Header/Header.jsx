import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

const Header = ({ currentPage }) => {
  return (
    <section className='container-fluid border-bottom' >
      <section className='container pt-4 pb-4' >
        <div className='row pb-2' >
          <div className='col' >
            <h2 className='text-left' >{currentPage}</h2>
          </div>
          <div className='col' >
            <h3 className='text-right' >Sistema Oficina</h3>
          </div>
        </div>
        <div className='row pt-2' >
          <div className='col' >
            <h4><a href="#">Inicio</a></h4>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Header