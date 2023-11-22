import React from "react"
import Header from "./Components/Header/Header"
import HomeScreen from "./Components/HomeScreen/HomeScreen"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const [currentPage, setCurrentPage] = React.useState('Bem Vindo')

  return (
    <BrowserRouter>
      <Header currentPage={currentPage} />
      <Routes>
        <Route path="/" element={<HomeScreen setCurrentPage={setCurrentPage} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
