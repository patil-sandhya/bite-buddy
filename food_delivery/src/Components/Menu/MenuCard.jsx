import React, { useState } from 'react'
import Details from './Details'
import { useAuth } from '@/context/AuthContext/Auth';
import { useAlertAndLoader } from '@/app/layout';
import { useCartContext } from '@/context/CartContext/CartContext';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/utils/addToCart';



const MenuCard = ({category,imageUrl,name,_id, price,description}) => {
    const [popup, setPopup] = useState(false)
    const menuData = {category,imageUrl,name, price,description, _id};
     const { isLoggedIn,userData } = useAuth();
        const { setAlert, setLoading } = useAlertAndLoader();
         const {cartItem,getCartItem} = useCartContext()
        
        const router = useRouter()
      const handleAddtoCart = async(foodId)=>{
      
          const isPresent = cartItem.some(item => item.foodid === foodId);
          if(isPresent){
            setAlert("success", "You've already added this one!")
            return false;
          }
      
          if(isLoggedIn){
            setLoading(true)
          try {
            let res = await addToCart({ userId:userData.userId, foodId, quantity: 1})
            if(res.success){
              setAlert('success', "Added to your cart! ")
              getCartItem(userData.userId)
            }
          } catch (error) {
            console.log(error)
            setAlert('error', 'Something went wrong!')
          }finally{
            setLoading(false)
          }
          }else{
            router.push("/sign-up")
          }
         
        }
    const handleClosePopup = ()=>{
        setPopup(false)
    }


  return (
    <>
    {
        popup && (
            <Details closeModal={handleClosePopup} {...menuData} />
        )
    }
    <div className='border rounded-xl py-4 hover:scale-110 max-w-[360px] px-2 shadow-md'>
        <img onClick={()=> setPopup(true)} src={imageUrl} alt="food-img" className="h-48 rounded-md w-96 cursor-pointer object-scale-down " />
        <div className='flex justify-center px-2 py-2 flex-col'>
            <h4 className='font-semibold text-lg '>{name}</h4>
            <p className='mt-1'>₹{price}</p>
             <div className='flex items-center justify-center'>
                <button onClick={()=> handleAddtoCart(_id)} className="mt-2 bg-[#f96d6d] rounded-md hover:bg-primary text-white font-medium px-6 py-2 transition-colors duration-200 transform -skew-x-12 ">
                <span className="transform skew-x-12">Add To Cart</span>
              </button>
             </div>
        </div>
    </div>
    </>
  )
}

export default MenuCard