import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { ThreeDots } from 'react-loader-spinner';
import { getDocs } from 'firebase/firestore';
import { seriesRef } from './firebase/firebase';
import Details from './Details';
import { Link } from 'react-router-dom';

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    async function getData() {
      setLoading(true)
      const _data = await getDocs(seriesRef);
      _data.forEach(doc => {
        setData((prevData) => [...prevData, { ...doc.data(), id: doc.id }])
      });

      setLoading(false)
    }
    getData()
  }, [])
  return (
    <div className='flex w-full justify-around  flex-wrap m-2'>
      {loading ? <div className='w-full flex flex-row  min-h-screen justify-center items-center'><ThreeDots /></div> :


        data.map((e, i) => {
          return (
            <Link key={i} to={`/details/${e.id}`} element={<Details />}>
              <div className='overflow-hidden flex min-h-96 flex-wrap  w-full justify-center '>

                <div key={i} className='card mt-4 transition-all duration-200 hover:scale-100 cursor-pointer p-2 rounded-xl hover:-translate-y-1'>
                  <img className='h-72 w-44  rounded-lg' src={e.image} alt="" />
                  <h2>Name : {e.title}</h2>
                  <h2>Year : {e.year}</h2>
                  <h2 className='flex items-center'>Rating :
                    <ReactStars className='px-2' half={true} size={'2rem'} edit={false} value={e.rating/e.rated} /> </h2>
                </div>
              </div>
            </Link>
          )
        })}




    </div>
  )
}

export default Cards