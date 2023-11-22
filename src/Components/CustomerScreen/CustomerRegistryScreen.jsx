import React from 'react'
import Input from '../Input/Input'
import 'bootstrap/dist/css/bootstrap.min.css'

const CustomerRegistryScreen = () => {
  const [name, setName] = React.useState('')
  const [cpf, setCpf] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [birthday, setBirthday] = React.useState('')

  return (
    <section className='mt-5 mb-5' >
      <form>
        <div className='row' >
          <div className='col-6' >
            <Input
              type='Text'
              label='Nome'
              id='name'
              value={name}
              handleChange={({target}) => setName(target.value)}
              placeholder='Insira seu nome'
            />
          </div>
          <div className='col-6' >
            <Input
                type='Text'
                label='CPF'
                id='cpf'
                value={cpf}
                handleChange={({target}) => setCpf(target.value)}
                placeholder='Insira seu CPF'
            />
          </div>
        </div>
        <div className='row' >
          <div className='col-6'>
            <Input
                type='Text'
                label='Email'
                id='email'
                value={email}
                handleChange={({target}) => setEmail(target.value)}
                placeholder='Insira seu email'
            />
          </div>
          <div className='col-6' >
            <Input
              type='Date'
              label='Data de Nascimento'
              id='birthday'
              value={birthday}
              handleChange={({target}) => setBirthday(target.value)}
            />
          </div>
        </div>
      </form>
    </section>
  )
}

export default CustomerRegistryScreen