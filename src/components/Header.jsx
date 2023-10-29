import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {AppState} from '../App'

const Header = () => {
  const useAppState = useContext(AppState)
  return (
    <div className='flex sticky z-10 top-0 justify-between text-3xl bg-black font-bold p-3 border-b-2 border-green-500'>
      <Link to={'/'}>
        <span className='text-green-500'>Sensie
          <span className='text-white'>Sight</span></span></Link>
      {useAppState.login?
      <>
        <Link to={'/add'}>
          <Button variant="outlined" color='success'>
            <h2 className='cursor-pointer text-lg items-center'> &nbsp;<AddIcon className='mr-2 font-bolder' /></h2>
          </Button>
          
        </Link>
        <Link to={'/logout'}>
         <Button variant="outlined" color='warning'>
            <h2 className='cursor-pointer text-lg items-center'>Logout</h2>
          </Button>
        </Link>
      </>
        :
        <Link to={'/login'}>
          <Button variant="outlined" color='success'>
            <h2 className='cursor-pointer text-lg items-center'>Login</h2>
          </Button>
        </Link>
      }
    </div>
  )
}

export default Header