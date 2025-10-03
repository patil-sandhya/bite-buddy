import { useAlertAndLoader } from '@/app/layout';
import { DeleteIcon } from '@/assets/Delete'
import { useAuth } from '@/context/AuthContext/Auth';
import { useCartContext } from '@/context/CartContext/CartContext';
import CartApi from '@/Services/CartApi'
import React from 'react'

const CartCard = ({name, price, foodid,imageUrl,qty, type}) => {
      const { userData } = useAuth();
      const {getCartItem} = useCartContext()
      const {setAlert, setLoading} = useAlertAndLoader();
    const handleQty = async(val)=>{
        const dataObj = {
            userId:userData.userId,
            quantity: Number(qty) + val,
            foodItemId:foodid
        }
        setLoading(true)
        try {
           const res = await CartApi.put_quantity(dataObj)
            if(res.status == 200){
            getCartItem(userData.userId)
            }
        } catch (error) {
            console.log(error)
            setAlert("error", 'Something went wrong')
        }finally{
            setLoading(false)
        }
    }

    const deleteCartItem = async()=>{
        setLoading(true)
        try {
            const dataObj = {
                userId: userData.userId, 
                foodItemId: foodid
            }
           let res = await CartApi.delete_removeCartItem(dataObj)
           console.log("delete res", res) 
           if(res.status == 200){
            setAlert('success', "Removed! The item is no longer in your cart.")
            getCartItem(userData.userId)
           }
        } catch (error) {
            console.log(error);
            setAlert('error',"Something went wrong")
        }finally{
            setLoading(false)
        }
    }


  return (
    <div className='flex text-textClr min-w-[300px] sm:min-w-[360px] p-4 md:p-5 justify-between rounded-md shadow-inner bg-secondary'>
        <div className='flex gap-5 md:gap-10 items-center'>
            <img src={imageUrl} alt="" className='h-32 w-32 ' />
            <div>
            <h4 className='font-semibold text-lg '>{name}</h4>
               {
                (type != "order") ? (
                    <div className='my-1 md:my-4'>
                <span className='font-semibold text-gray-800'>Quantity:</span>

                <br />
                     <div className='flex gap-6 my-2 items-center'>
                     <button disabled={(qty <= 1)} onClick={()=> handleQty(-1)} className='h-8 w-8 font-semibold text-xl rounded-full disabled:bg-[#ff9696] bg-primary text-white'>-</button> 
                <span>{qty}</span>
                <button onClick={()=> handleQty(1)} className='h-8 w-8 font-semibold text-xl rounded-full bg-primary text-white'>+</button> 
                </div>
                
               
            </div>
            ) : (
                 <div className='my-1 md:my-4'>
                <span className='font-semibold text-gray-800'>Quantity: </span>{qty}

                </div>
            )
               }

            <div className=''>
                <div> <span className='font-semibold text-gray-800'>Price:</span> ₹{price}</div>
                 <div className='text-gray-500'>
                    Total Price: ₹{Number(price) * Number(qty)}
                 </div>
            </div>
        </div>
        </div>
        
        {
            (type != "order") && (
                <div>
            <button onClick={deleteCartItem}>
                <DeleteIcon />
            </button>
        </div>
            )
        }
    </div>
  )
}

export default CartCard