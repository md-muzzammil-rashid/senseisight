import { Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { auth, provider } from './firebase/firebase'
import { signInWithPopup } from 'firebase/auth'
import swal from 'sweetalert'
import { AppState } from '../App'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const useAppState = useContext(AppState)
    const [value, setValue] = useState('')
    const navigate = useNavigate()
    
    useEffect(()=>{
        setValue(localStorage.getItem('email'))
    },[value])
    return (
        <div className='flex w-screen h-screen justify-center items-center'>
            <Button 
            onClick={()=>{
                try {
                    signInWithPopup(auth,provider).then((data)=>{
                    setValue(data.user.email)
                    localStorage.setItem('email',data.user.email)
                    swal({
                        title: "Login Successful",
                        icon: 'success',
                        buttons: false,
                        timer: 3000
                    })
                    useAppState.setLogin(true)
                    navigate(-1)
                })
                } catch (error) {
                    swal({
                        title: error,
                        icon: 'error',
                        buttons: false,
                        timer: 3000
                    })
                }
                
            }}
            color='success' 
            variant="outlined">
                Login with Google
            </Button>
        </div>
    )
}

export default Login