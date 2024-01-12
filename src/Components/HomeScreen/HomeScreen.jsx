import React from 'react'
import LinkToServiceScreen from './LinkToServiceScreen'
import { ReactComponent as Person } from '../../Images/person-solid.svg'
import { ReactComponent as House } from '../../Images/house-solid.svg'
import { ReactComponent as Phone } from '../../Images/phone-solid.svg'
import 'bootstrap/dist/css/bootstrap.min.css'

const HomeScreen = ({ setCurrentPage }) => {

  React.useEffect(() => {
    setCurrentPage('Bem Vindo!')
  }, [setCurrentPage])

  return (
    <section className='container mt-5' >
      <div className='row' >
        <LinkToServiceScreen href='clientes' LinkIcon={<Person/>} linkDescription='Clientes' />
        <LinkToServiceScreen href='enderecos' LinkIcon={<House/>} linkDescription='Endereços' />
        <LinkToServiceScreen href='#' LinkIcon={<Phone/>} linkDescription='Telefones' />
      </div>
    </section>
  )
}

export default HomeScreen