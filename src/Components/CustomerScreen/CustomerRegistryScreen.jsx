import React from 'react'
import Input from '../Form/Input/Input'
import Select from '../Form/Select/Select'
import Button from '../Form/Button/Button'
import useForm from '../../Hooks/useForm'
import 'bootstrap/dist/css/bootstrap.min.css'

const CustomerRegistryScreen = () => {
  const name = useForm('name')
  const cpf = useForm('cpf')
  const email = useForm('email')
  const address = useForm('address')
  const birthday = useForm('birthday')
  const [gender, setGender] = React.useState('')

  const genderOptions = ['Masculino', 'Feminino']

  const inputsValues = [
    {
      type: 'Text',
      label: 'Nome',
      id: 'name',
      placeholder: 'Insira o nome do cliente',
      data: name
    },
    {
      type: 'Text',
      label: 'CPF',
      id: 'cpf',
      placeholder: 'Insira o CPF do cliente',
      data: cpf
    },
    {
      type: 'Text',
      label: 'Email',
      id: 'email',
      placeholder: 'Insira o email do cliente',
      data: email
    },
    {
      type: 'Date',
      label: 'Data de Nascimento',
      id: 'birthday',
      placeholder: '',
      data: birthday
    },
    {
      type: 'Text',
      label: 'Endereço',
      id: 'address',
      placeholder: 'Insira o logradouro do cliente',
      data: address
    },
  ]

  return (
    <section className='mt-5 mb-5' >
      <form>
        <div className='row' >
          {
            inputsValues.map((inputValues) => (
              <div key={inputValues.id} className='col-6' >
                <Input
                  id={inputValues.id}
                  label={inputValues.label}
                  type={inputValues.type}
                  placeholder={inputValues.placeholder}
                  {...inputValues.data}
                />
                {
                  /*Create a function for button to find an address*/
                  inputValues.id === 'address'
                  ? (
                    <Button
                      description='Buscar Endereço'
                    />
                  ) : (
                    null
                  )
                }
              </div>
            ))
          }
          <div className='col-6' >
            <Select
              id='gender'
              label='Gênero'
              options={genderOptions}
              value={gender}
              setValue={setGender}
            />
          </div>
        </div>
        <div className='row mt-5' >
          <div className='col-6 d-flex justify-content-end' >
            {/*Create a function for button to clear the form*/}
            <Button
              description='Limpar Formulário'
            />
          </div>
          <div className='col-6' >
            {/*Create a function for button to save the customer*/}
            <Button
              description='Salvar Cliente'
            />
          </div>
        </div>
      </form>
    </section>
  )
}

export default CustomerRegistryScreen