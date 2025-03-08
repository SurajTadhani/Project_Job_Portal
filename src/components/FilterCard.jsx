import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

function FilterCard() {
    const fitlerData = [
      {
          fitlerType: "Location",
          array: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"]
      },
      {
          fitlerType: "Industry",
          array: ["Frontend Developer", "Backend Developer", "Mern Stack Developer","Graphic Designer", "Video Editor"]
      },
      {
          fitlerType: "Salary",
          array: ["0-10", "11-20", "21-50"]
      },
  ]

    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);



  return (
    <>
    
    <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup onValueChange={changeHandler} value={selectedValue} >
                {
                    fitlerData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={index} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    
    </>
  )
}

export default FilterCard