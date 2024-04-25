import { NavLink } from 'react-router-dom'
import '../src/index.css'

const NavigateBar = () => {
  return (
    
    <header className='header'>
        <NavLink to='/' className='w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md'>
            <p className='blue-gradient_text'>AH</p>
        </NavLink>
        <nav className='flex text-lg gap-7 font-medium'>
            <NavLink to='/settings' 
            className={({ isActive }) => isActive ? "text-blue-600" : "text-black" }
            >
                Settings
            </NavLink>
            <NavLink to='/gameplay' className={({isActive}) => isActive ? 'text-blue-500' : 'text-black'}>
                GamePlay
            </NavLink>
        </nav>

    </header>

  )
}

export default NavigateBar
