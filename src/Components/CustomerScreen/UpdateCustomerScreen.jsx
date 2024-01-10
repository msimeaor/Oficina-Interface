import React from 'react'
import Button from '../Form/Button/Button'

const UpdateCustomerScreen = ({ tableRowSelectedObject, setUpdateCustomerScreen }) => {
  return (
    <div>
      <Button className='btn btn-danger' description='Voltar' handleClick={() => setUpdateCustomerScreen(false)} />
      <Button className='btn btn-danger' description='Mostrar Objeto' handleClick={() => console.log(tableRowSelectedObject)} />
    </div>
  )
}

export default UpdateCustomerScreen