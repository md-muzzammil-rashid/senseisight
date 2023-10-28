import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { seriesRef } from './firebase/firebase'
import { db } from './firebase/firebase'
import { ThreeCircles } from 'react-loader-spinner'
import Reviews from './Reviews'


const Details = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        title: '',
        year: '',
        description: '',
        image: '',
        rating: 0,
        genre: '',
        rated: 0
    });

    useEffect(() => {
        async function getData() {
            setLoading(true)
            const _doc = doc(db, 'Series', id)
            const _data = await getDoc(_doc)
            setData(_data.data())
            setLoading(false)
        }
        getData()
    }, []);

    return (
        <div className='flex w-full min-h-screen flex-col'>
            {loading ? <div className='flex justify-center w-full min-h-screen items-center '><ThreeCircles size={"20"} /></div> :
                <>
                    <div className='text-white  sm:flex sm:justify-center w-full sm:items-center md:flex' >
                        <div className='md:relative md:h-screen sm:flex sm:justify-center'>
                            <img className=' sm:p-10 md:sticky  md:top-20 sm:w-screen  md:m-5 md:w-80 md:h-96' src={data.image} alt="" />
                        </div>
                        <div className='md:w-2/3'>
                        
                            <h1 className='m-5 font-bold text-2xl'> <span>{data.title}</span> <span>{data.year}</span> </h1>
                            <div className='flex'>
                                <ReactStars className='pl-3'
                                    size={30}
                                    half={true}
                                    value={data.rating / data.rated}
                                    edit={false}

                                /><span className='pt-3 pl-2'>({data.rated})</span>
                            </div>
                            <h2 className='m-5'>Genres: {data.genre}</h2>
                            <p className='mt-2 p-5'>{data.description}</p>
                            <Reviews id={id} userRated={data.rated} prevRating={data.rating} />
                        </div>
                    </div>
                    <div className='w-full mb-5 flex justify-center'>
                        <Button onClick={() => navigate(-1)} variant="outlined" color="success" className='font-bold'>
                            Back
                        </Button>
                    </div>
                </>
            }
        </div>
    )
}

export default Details