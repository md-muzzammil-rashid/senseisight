import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import ReactStars from 'react-stars'
import { reviewsRef, db, auth } from './firebase/firebase'
import { updateDoc, doc, addDoc, getDocs, where, query } from 'firebase/firestore'
import { Comment, TailSpin, ThreeCircles } from 'react-loader-spinner'
import swal from 'sweetalert'
import { AppState } from '../App'
import { useNavigate } from 'react-router-dom'

const Reviews = (props) => {
    const useAppState = useContext(AppState)
    const navigate = useNavigate()
    const [newAdded, setNewAdded]=useState(0)
    const [rating, setRating] = useState(0)
    const [form, setForm] = useState('')
    const [reviewData, setReviewData] = useState([])
    const [loading, setLoading] = useState(false)
    const [reviewLoading, setReviewLoading] = useState(false)
    const sendReview = () => {
        if(useAppState.login){

        
        if (form == '' || form == ' ' || rating == 0) {
            swal({
                title: "fill the details",
                icon: 'error',
                buttons: false,
                timer: 3000
            })
            return
        }
        setLoading(true)
        try {
            addDoc(reviewsRef, {
                seriesId: props.id,
                userName: auth.currentUser.displayName,
                rating: rating,
                review: form,
                timestamp: new Date().getTime()
            }
            )
            setReviewData([])
            setNewAdded(newAdded+1)
            
            const docRef = doc(db, 'Series', props.id);
            updateDoc(docRef, {
                rating: rating + props.prevRating,
                rated: props.userRated + 1
            });
            setRating(0)
            swal({
                title: "Successfully Added",
                icon: 'success',
                buttons: false,
                timer: 3000
            })
        }
        catch (error) {
            swal({
                title: error,
                icon: 'error',
                buttons: false,
                timer: 3000
            })
        }

        setLoading(false)
        setForm('')


    }
    else{
        swal({
            title: 'Please Login',
            icon: 'error',
            buttons: false,
            timer: 3000
        })
        navigate('/login')
    }
    }
    const sortedData = reviewData.sort((a,b)=>{if(a.timestamp>b.timestamp)return -1;if(a.timestamp<b.timestamp)return 1; return 0})
    useEffect(() => {
        async function setReview() {
            setReviewLoading(true)

            let myQuery = new query(reviewsRef, where("seriesId", "==", props.id))
            const querySnapShot = await getDocs(myQuery);
            querySnapShot.forEach(element => {
                setReviewData((reviewData) => [...reviewData, element.data()])

            });
            setReviewLoading(false)

        }
        setReview()
    }, [newAdded])

    return (
        <div className='w-full p-5 flex flex-col'>

            <ReactStars
                className='-mt-6'
                half={true}
                size={40}
                value={rating}
                onChange={(e) => setRating(e)}
            />
            <br />
            <input required value={form} onChange={(e) => setForm(e.target.value)} className='w-full mb-8 bg-gray-700  p-1 pl-4'
                type="text"
                placeholder='Write your review...'
            />
            <Button onClick={sendReview} className=' w-full m-5 ' variant="contained" color='success'>{loading ? <TailSpin height={25} /> : 'Review'}</Button>

            {reviewLoading ? <div className='w-full flex justify-center'><Comment backgroundColor='green' /></div> :
                <div className='mt-6 bg-gray-950 pl-5 pt-5'>
                    {

                    sortedData.map((e, i) => {
                        return (<div className='m-2 ' key={i}>
                            <h5 className='text-s text-green-500 font-bold'>{e.userName}<spam className='font-medium from-stone-400'>({new Date(e.timestamp).toLocaleString()})</spam></h5>
                            <h2 >{e.review}</h2>
                            <ReactStars
                                half={true}
                                value={e.rating}
                                edit={false}
                                size={15}
                            />
                        </div>)
                    })}
                </div>

            }


        </div>
    )
}

export default Reviews