import React from "react"
import Header from "./Components/Header/Header"
import HomeScreen from "./Components/HomeScreen/HomeScreen"
import CustomerScreen from "./Components/CustomerScreen/CustomerScreen"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import './globalStyles.css'
import AddressScreen from "./Components/AddressScreen/AddressScreen"
import PhoneScreen from "./Components/PhoneScreen/PhoneScreen"

const App = () => {
  const [currentPage, setCurrentPage] = React.useState('Bem Vindo')

  return (
    <BrowserRouter>
      <Header currentPage={currentPage} />
      <Routes>
        <Route path="/" element={<HomeScreen setCurrentPage={setCurrentPage} />} />
        <Route path="/clientes/*" element={<CustomerScreen setCurrentPage={setCurrentPage} />} />
        <Route path="/enderecos/*" element={<AddressScreen setCurrentPage={setCurrentPage} />} />
        <Route path="/telefones/*" element={<PhoneScreen setCurrentPage={setCurrentPage} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
