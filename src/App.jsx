import { useState } from 'react'
import {Route, HashRouter, Routes} from 'react-router-dom'
import {Home, Settings, GamePlay} from '/pages'
import NavigateBar from '../components/NavigateBar'

const App = () => {
  return (
    <main className='bg-slate-300/20 h-screen'>
      <HashRouter>

        <NavigateBar/>
        <Routes>
          <Route path={import.meta.env.BASE_URL} element={<Home/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/gameplay' element={<GamePlay/>}/>
        </Routes>
      </HashRouter>
    </main>
  )
}

export default App
