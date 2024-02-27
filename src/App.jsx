import { Route, Routes } from 'react-router-dom'
import Home from './components/Main/main'
import Signup from './components/registr/main'
import Login from './components/login/main'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [token, setToken] = useState(false);
  const [data, setData] = useState(localStorage.getItem('data'));
  const [data1, setData1] = useState(null);

  return (
    <>
      <div className="app">
        <Routes>
          {
            data || data1
              ?
              (token ? (<Route path='/' element={<Home setData={setData} />} />) : 
              
              (<Route path='/' element={<Login setdata1={setData1} setToken={setToken} />} />))
              :
              (<Route path='/' element={<Signup setData={setData} />} />)
          }
        </Routes>
      </div>
    </>
  )
}

export default App