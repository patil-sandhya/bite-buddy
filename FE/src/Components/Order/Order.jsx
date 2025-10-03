'use client'
import { useAlertAndLoader } from '@/app/layout'
import { useAuth } from '@/context/AuthContext/Auth'
import OrderApi from '@/Services/Order'
import { useEffect, useState } from 'react'
import CartCard from '../Cart/CartCard'
import Link from 'next/link'
import bagImg from '@/assets/cart/bag.png';
import Image from 'next/image'

const Order = () => {
  const [orders, setOrders] = useState([])
  const {setAlert, setLoading} = useAlertAndLoader()
  const {userData} = useAuth()
  const getOrders = async()=>{
    setLoading(true)
    try {
      let res = await OrderApi.get_order(userData.userId)
      console.log(res)
      setOrders(res.data)
    } catch (error) {
      console.log(error)
      setAlert("error", "Unable to fetch orders!")
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(userData){
    getOrders()

    }
  },[userData])
  return (
    <div className='py-10 sm:py-20 px-2 bg-white text-textClr md:px-5'>
      {
        (orders.length > 0) ? (
          <div className='my-10 pt-10 mx-1 md:mx-5 space-y-5' >
            {
                orders.map((item, index)=>{
                  const date = new Date(item.createdAt);
                  const readableDate = date.toLocaleDateString();  
                  const readableTime = date.toLocaleTimeString();  

                  return (
                    <div key={index} className='border-2 border-primary rounded-md p-5'>
                      <div className='font-semibold'>Order Id: <span className='text-gray-500'> {item._id}</span> </div>
                      <p className='font-semibold'>
                        Date: <span className='text-gray-500'>{readableDate}</span>
                      </p>
                      <p className='font-semibold'>
                      Time: <span className='text-gray-500'>{readableTime}</span>
                      </p>
                      <p className='font-semibold'>Grand Total: <span className='text-gray-500'>{item.totalAmount}</span> </p>
                      <div className=' mt-2 flex flex-wrap gap-5'>
                        {
                          item.items.map((item, index)=>{
                            return <CartCard key={index} {...item} type="order" />
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
          </div>
        ):(
          <div className='w-full flex justify-center items-center gap-5'>
        <div className='md:w-3/5 w-full m-5 p-5 font-semibold shadow-lg rounded-2xl bg-primary text-white text-2xl text-center'>
                No orders found. <br />
                <Link href="/menu" className='cursor-pointer hover:text-textClr underline'> Ready to place your first one? </Link>🍕
               <div className='flex justify-center items-center mt-5'>
                 <Image src={bagImg} className='rounded-full h-48 w-48' alt="" />
               </div>
              </div>
      </div>
        )
      }
    </div>
  )
}

export default Order