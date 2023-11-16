import React from "react"
import Header from './Components/Header/Header.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const [currentPageName, setCurrentPageName] = React.useState('Bem Vindo!')

  return (
    <>
      <BrowserRouter>
        <Header currentPage={currentPageName} />
        <Routes>
          <Route path="/sistema-oficina/inicio" element={/*HomeScreen*/} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
