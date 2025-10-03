'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext/Auth';
import { useAlertAndLoader } from '@/app/layout';
import { useCartContext } from '@/context/CartContext/CartContext';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/utils/addToCart';

const Details = ({closeModal,_id, category,imageUrl,name, price,description}) => {
    const [quantity, setquantity] = useState(1);
 const { isLoggedIn,userData } = useAuth();
        const { setAlert, setLoading } = useAlertAndLoader();
         const {cartItem,getCartItem} = useCartContext()
        
        const router = useRouter()
      const handleAddtoCart = async(foodId)=>{
        console.log(foodId,cartItem )
        const isPresent = cartItem.some(item => item.foodid === foodId);
        if(isPresent){
          setAlert("success", "Item already added in cart")
          closeModal();
          return false;

        }
    
        if(isLoggedIn){
          setLoading(true)
        try {
          let res = await addToCart({ userId:userData.userId, foodId, quantity: quantity})
          if(res.success){
            setAlert('success', "Item added to cart")
             getCartItem(userData.userId)
          }
        } catch (error) {
          console.log(error)
          setAlert('error', 'Something went wrong')
        }finally{
          setLoading(false)
          closeModal();
        }
        }else{
          closeModal();
          router.push("/sign-up")
        }
       
      }

      console.log("cart items", cartItem)
  return (
    <>
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
    <div className="relative h-5/6 custom-scrollbar overflow-y-auto mx-2 sm:mx-0  bg-white  rounded-xl w-full max-w-md shadow-lg">
      {/* Close button */}
      <div className="sticky top-0 z-10 w-full bg-white border-b px-4  flex justify-end">
    <button
      onClick={closeModal}
      className="text-xl my-2 text-gray-500 hover:text-black"
    >
      <X />
    </button>
  </div>
      <div className='p-5'>
      <img
        src={imageUrl}
        alt="popup-img"
        className=" w-72  rounded-md mb-4"
      />
<h2 className='font-semibold text-lg'>{name}</h2>

      {/* Description */}
      <p className="text-gray-700 my-2">{description}</p>

      {/* Price */}
      <p className="text-lg font-semibold text-primary mb-4">
        ₹{price}
      </p>

      {/* Quantity Control */}
      <div className="flex items-center gap-2 my-2 justify-between w-32 mb-4">
        <div className='mr-1 text-gray-700'>Quantity: </div>
        <button
          onClick={() =>
            setquantity(Math.max(1, (quantity || 1) - 1))
          }
          className="px-3 py-1 bg-gray-200 rounded-full"
        >
          -
        </button>
        <span className="text-lg font-medium">
          {quantity}
        </span>
        <button
          onClick={() =>
            setquantity((quantity || 1) + 1)
          }
          className="px-3 py-1 bg-gray-200 rounded-full"
        >
          +
        </button>
      </div>

      {/* Add to Cart */}
      <div className='flex justify-center my-8'>
        {/* <button
        className="inline-block px-8 bg-primary text-white py-3 rounded-full hover:bg-coral-600 transition"
        onClick={() => {
          handleAddtoCart(_id)
        }}
      >
        Add to Cart
      </button> */}
      <button onClick={()=> handleAddtoCart(_id)} className="mt-2 bg-[#f96d6d] rounded-md hover:bg-primary text-white font-medium px-8 py-2 transition-colors duration-200 transform -skew-x-12 ">
        <span className="transform skew-x-12">Add To Cart</span>
      </button>
      </div>
      </div>
    </div>
  </div>

    </>
  )
}

export default Details