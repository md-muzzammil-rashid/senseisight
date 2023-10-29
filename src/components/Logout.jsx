import React, { useContext } from 'react'
import { Button } from '@mui/material'
import {auth} from './firebase/firebase'
import { signOut } from 'firebase/auth'
import swal from 'sweetalert'
import { AppState } from '../App'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const useAppState = useContext(AppState)
    const navigate = useNavigate()
  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center'>
    <h2 className='mb-3'>Logout as {auth.currentUser.displayName}</h2>
        <Button 
            onClick={()=>{
                    localStorage.clear()
                    signOut(auth).then(()=>{
                        swal({
                            title: "Logout Successfully",
                            icon: 'success',
                            buttons: false,
                            timer: 3000
                        })
                        useAppState.setLogin(false);
                        navigate('/')

                    })
                }
            }
            color='success' 
            variant="outlined">
                Logout
            </Button>
    </div>
  )
}

export default Logout