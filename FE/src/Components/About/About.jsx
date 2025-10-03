import React from 'react'
import junkfood from '@/assets/about/junkFood.webp';
import Image from 'next/image';

const Card = ({val, head})=>{
    return (
        <div className='bg-gray-100 rounded-xl inline-block p-8 min-w-[240px] max-h-[150px] text-textClr'>
            <div className='font-semibold text-4xl'>{val}</div>
            <h4 className='mt-4 '>{head}</h4>
        </div>
    )
}

const About = () => {
  return (
    <div className='pt-24 pb-10 sm:pt-32 bg-white text-textClr'>
        <div className='bg-primary mx-2 md:mx-24  lg:mx-40 p-6 rounded-md flex flex-col lg:flex-row justify-center items-center gap-5  my-5'>
            <div className='lg:w-1/2 w-full '>
                <div className="bg-white  rounded-md shadow-inner px-5 py-10 w-full lg:w-full ">
             <h4 className="text-base font-semibold text-[#f9d649] uppercase tracking-[0.4em]">
            about us
          </h4>
          <h2 className=' my-10 font-semibold text-5xl'>Delivering Happiness, One Meal at a Time</h2>
          <p className='w-4/5 tracking-wide text-gray-500'>
            At Forky, we’re on a mission to transform the way you experience food delivery. Whether you’re craving local favorites or international cuisine, we connect you with top-rated restaurants in your area and ensure your meals arrive hot, fresh, and right on time. With an easy-to-use platform and a commitment to quality, we make sure every bite you take is worth the wait.
          </p>
            <h5 className='font-semibold mt-10 text-2xl'>🌟 Our Vision</h5>
            <p className='mt-1 tracking-wide w-4/5 text-gray-500'>To be the most trusted and loved food delivery platform, bringing joy to every meal and every doorstep.</p>
            </div>
            </div>
            
            <div className='w-full lg:w-1/2'>
                <Image src={junkfood} className='rounded-md w-full h-1/2' alt="" />
                <div className='h-1/2 mt-4 rounded-md p-5 gap-4 lg:gap-2 justify-center w-full flex flex-wrap bg-white shadow-inner'>
                    <Card val={"800+"} head={"Positive reviews"} />
                    <Card val={"2k"} head={"Happy Customers"} />
                    <Card val={"98%"} head={"On-Time Orders"} />
                    <Card val={"10+"} head={"Cities Served"} />

                </div>
            </div>
        </div>
    </div>
  )
}

export default About