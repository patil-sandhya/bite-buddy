'use client'
import { useAlertAndLoader } from '@/app/layout';
import { useAuth } from '@/context/AuthContext/Auth';
import { useCartContext } from '@/context/CartContext/CartContext';
import OrderApi from '@/Services/Order';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import phonepay from '@/assets/cart/phonepay.jpeg';
import Image from 'next/image';

export default function PaymentPopup({ isOpen, onClose, totalAmount }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const {setAlert, setLoading} = useAlertAndLoader()
  const {userData} = useAuth()
  const router = useRouter()
 const {getCartItem} = useCartContext()

  const placeOrder = async()=>{
    setLoading(true)
    try {
      const data ={totalAmount, userId: userData.userId}
      let res = await OrderApi.post_order(data)
      if(res.status == 200){
        setAlert('success', "Your delicious food is on the way.")
        getCartItem(userData.userId)
        router.push('/order')
        setOtp(["", "", "", ""])
        
      }
    } catch (error) {
     console.log(error) 
     setAlert("error", "Something went wrong")
    }finally{
      setLoading(false)
      onClose()
    }
  }

  const handleKeyDown = (e, index) => {
  if (e.key === 'Backspace' && !otp[index] && index > 0) {
    inputsRef.current[index - 1].focus();
  }
};

  const handleChange = (index, value) => {
  if (/^[0-9]?$/.test(value)) {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  }
};

  const handleSubmit = () => {
    const fullOtp = otp.join('');
    if(fullOtp.length == 4){
    placeOrder()
    }else{
      setAlert('error', 'Enter 4 digit opt')
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer right-4 top-4 text-gray-400 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* QR Image */}
        <div className="flex flex-col items-center">
          <Image
            src={phonepay}
            alt="PhonePe QR"
            className="w-52 h-52 object-contain mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">Scan & Pay</h3>

          {/* OTP Input */}
          <div className="flex justify-center gap-2 mt-4">
            {otp.map((digit, i) => (
  <input
    key={i}
    ref={(el) => (inputsRef.current[i] = el)}
    type="text"
    inputMode="numeric"
    maxLength="1"
    className="w-12 h-12 text-center border border-gray-300 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-primary"
    value={digit}
    onChange={(e) => handleChange(i, e.target.value)}
    onKeyDown={(e) => handleKeyDown(e, i)}  // ← Add this line
  />
))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={otp.join('').length < 4}
            className="mt-6 disabled:bg-[#f87878] bg-primary text-white px-6 py-2 rounded-full"
          >
            Submit OTP
          </button>
        </div>
      </div>
    </div>
  );
}
