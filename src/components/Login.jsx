import { Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { auth, provider } from './firebase/firebase'
import { signInWithPopup } from 'firebase/auth'
import swal from 'sweetalert'
import { AppState } from '../App'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from './firebase/firebase'


const Login = () => {
    const useAppState = useContext(AppState)
    const [Login, setLogin] = useState('')
    const navigate = useNavigate()

    const clickHandler= async ()=>{
        try {
            await signInWithPopup(auth, provider).then((data) => {
                const userID = data.user.uid;
                setLogin(data.user.email)
                console.log(userID);
                setDoc(doc(db, `usersDB/${userID}`),{uid: data.user.uid, displayName: data.user.displayName, photoURL: data.user.photoURL, email: data.user.email})
                navigate(-1)
        })
        }
                // localStorage.setItem('email', data.user.email);
                // const userD =  data.user;

                // // swal({
                // //     title: "Login Successful",
                // //     icon: 'success',
                // //     buttons: false,
                // //     timer: 3000
                // // })
                // useAppState.setLogin(true)
                // setUserData({ uid: userD.uid, displayName: userD.displayName, photoURL: userD.photoURL, email: userD.email })
                // console.log(userData)

            // }) 
         catch (error) {
            // 
        }

    }

    // const clickHandler = (e) => {
    //     e.preventDefault()
    //     signInWithPopup(auth, provider).then((data) => {
    //         setLogin(data.user.email)
    //         console.log(Login);
    //     }
    //     )
    // }

    // useEffect(() => {

    //     setLogin(localStorage.getItem('email'))
    // }, [Login,userData])
    return (
        <div className='flex w-screen h-screen justify-center items-center'>
            <Button
                onClick={ clickHandler}
                color='success'
                variant="outlined">
                Login with Google
            </Button>
        </div>
    )
}

export default Login