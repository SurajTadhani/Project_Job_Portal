import React, { useEffect } from 'react'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

function Browser() {
    const randomJobs = [1, 2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
  return (
    <>
    
    <div className='max-w-7xl mx-auto mb-[100px] mt-[140px]'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>

            </div>
    </>
  )
}

export default Browser