'use client'
import { useCartContext } from '@/context/CartContext/CartContext'
import CartCard from './CartCard'
import { useEffect, useState } from 'react'
import AddressModal from './AddressModal'
import { useAuth } from '@/context/AuthContext/Auth'
import PaymentPopup from './PaymentPopup'
import Link from 'next/link'
import emptycart from '@/assets/cart/emptycart.png';
import Image from 'next/image'
import boxImg from '@/assets/cart/box.png';
import { useAlertAndLoader } from '@/app/layout'

const Cart = () => {
 const {cartItem} = useCartContext()
const [showAddressModal, setShowAddressModal] = useState(false);
  const { userAddress} = useAuth();
const [isModalOpen, setModalOpen] = useState(false);
  const {setAlert} = useAlertAndLoader()
  const [bill, setBill] = useState({
    itemTotal:0,
    gst:0,
    grandTotal:0
  })

  const calculateBill = ()=>{
    let total = 0
    for(let i=0; i<cartItem.length; i++){
      total+= cartItem[i].price * cartItem[i].qty
    }
    let gst = Math.ceil(total /100 * 18)
    let grandTotal = total + gst + 57 + 8
    setBill((prev)=>(
      {...prev, itemTotal:total, gst, grandTotal}
    ))
  }
 const handlePayment = ()=>{
  if(!userAddress){
    setAlert('warning', 'Please add your address!')
  }else{
    setModalOpen(true) 
  }
 }
  useEffect(()=>{
    calculateBill()
  },[cartItem])

  console.log("use ade", cartItem)
  return (
    <div className='mt-24 sm:mt-32 lg:mb-10 flex flex-col sm:flex-row'>
       <AddressModal
  isOpen={showAddressModal}
  onClose={() => setShowAddressModal(false)}
/>
  <PaymentPopup
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        totalAmount= {bill.grandTotal} 
      />
      {
        (cartItem.length > 0) ? (
          <>
          <div className='md:w-3/5 mx-2 md:mx-5 lg:mx-8'>
          <div className='space-y-4'>
           {
                cartItem.map((item, index)=>{
                  return <CartCard key={index} {...item} />
                })
              }
          </div>
      </div>
<div className='md:w-2/5 mt-2 sm:mt-0 md:mx-2 lg:mx-5 p-5 bg-primary rounded-md'>
        <div>
          <h4 className='font-semibold text-lg text-white'>Bill Summary</h4>
        </div>
        <div className='bg-white text-textClr shadow-inner rounded-lg m-4 p-5 space-y-4'>
            <div className='flex justify-between items-center'>
              <div>Item total</div>
              <div>₹{bill.itemTotal}</div>
            </div>
            <div className='flex justify-between items-center'>
              <div className="underline decoration-dotted decoration-gray-400 underline-offset-4">GST and restaurant charges</div>
              <div>₹{bill.gst}</div>
            </div>
            <div className='flex justify-between items-center'>
              <div>
                <span className="underline decoration-dotted decoration-gray-400 underline-offset-4">Delivery partner fee</span> <br /> 
                <span className='text-gray-400'>goes to them for their time and efforts</span> 
                </div>
              <div>₹57</div>
            </div>
            <div className='flex justify-between items-center'>
              <div  className="underline decoration-dotted decoration-gray-400 underline-offset-4">Platform fee</div>
              <div> <span className='line-through text-gray-400'>₹10</span> ₹8</div>
            </div>
            <hr />
            <div className='flex justify-between items-center'>
              <div>Grand Total</div>
              <div>₹{bill.grandTotal}</div>
            </div>
        </div>
        {
          userAddress && (
            <div className='md:mx-6 mx-2 gap-2 text-gray-700'>
              <h4 className='font-semibold'>Deliver to:</h4>
              <p>{userAddress.firstName}, {userAddress.street}, {userAddress.city}-{userAddress.pincode}</p>
              <p>{userAddress.phone}</p>
            </div>
          )
        }
        <div className='flex justify-center gap-8 items-center'>
          
          <button onClick={handlePayment} className="flex items-center justify-center text-primary px-8 py-4 rounded-md border border-primary font-semibold  transition-colors bg-white backdrop-blur-sm">
                Make a Payment
              </button>
              {
                !userAddress && (
<button onClick={()=> setShowAddressModal(true)} className="flex items-center justify-center text-primary px-8 py-4 rounded-md border border-primary font-semibold  transition-colors bg-white backdrop-blur-sm">
                Add Address
              </button>
                )
              }
               
        </div>
        <div>
          <Image src={boxImg} alt="lunch box" />
        </div>
      </div>
      </>
        ) : (
<div className='w-full flex justify-center items-center gap-5'>
        <div className='md:w-3/5 w-full m-5 p-5 font-semibold shadow-lg rounded-2xl bg-primary text-white text-2xl text-center'>
                You’re just a few clicks away from deliciousness 🍲🛒 <br /> 
                <Link href="/menu" className='cursor-pointer hover:text-textClr underline'> Start exploring!</Link>
               <div className='flex justify-center items-center mt-5'>
                 <Image src={emptycart} className='rounded-full h-48 w-48' alt="" />
               </div>
              </div>
      </div>    
        )
      }

      {/* {
        (cartItem.length > 0) && (
          
        )
      } */}
    </div>
  )
}

export default Cart