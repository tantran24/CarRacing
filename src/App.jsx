import { useState } from 'react'
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import {Home, Settings, GamePlay} from '/pages'
import NavigateBar from '../components/NavigateBar'

const App = () => {
  return (
    <main className='bg-slate-300/20 h-screen'>
      <BrowserRouter basename='/'>

        <NavigateBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/gameplay' element={<GamePlay/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
