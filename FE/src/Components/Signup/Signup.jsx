'use client'
import { useAlertAndLoader } from "@/app/layout";
import { useAuth } from "@/context/AuthContext/Auth";
import { useCartContext } from "@/context/CartContext/CartContext";
import ApiSercies from "@/Services/CommonApi";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import maggie from '@/assets/about/maggie.png';
import paneer from '@/assets/about/paneer.webp';
import pasta from '@/assets/about/pasta.png';
import vegPizza from '@/assets/about/vegPizza.png';
import Image from "next/image";


const Signup = () => {
   const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(true)
  const [type, setType] = useState('signup');
  const { setAlert, setLoading } = useAlertAndLoader();
  const {handelUserLogin,handleUserAddress} = useAuth()
  const {getCartItem} = useCartContext()
  const router = useRouter();
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:''
  })
 const [msg, setMsg] = useState('');
  const [disable, setDisable] = useState(true)

  const handleSignup = ()=>{
    if(type == 'signup'){
      setType('signin')
    }else{
      setType('signup')
    }
  }

  const handleRegister = async()=>{
    const data = {
      email: formData.email,
      password: formData.password,
      name: formData.name
    }
    try {
      let res = await ApiSercies.post_signUp(data)
      console.log(res)
      if(res.data?.newUser){
        setAlert('success', `You're signed up! Please log in to continue.`)
        setType("signin")
      }
    } catch (error) {
      setAlert('error', 'Error creating account. Please try again later.')
      console.log(error)
    }
  }

  const handleLogin = async()=>{
    const data = {
      email: formData.email,
      password: formData.password
    }
    setLoading(true)
    try {
      let res = await ApiSercies.post_signIn(data)
      console.log(res)
      if(res?.data){
        // console.log(res.data)
        setAlert("success", `Welcome to Forky, ${res?.data?.name}. You’re now logged in`)
        localStorage.setItem('token', res?.data?.token);
        localStorage.setItem('name', res?.data?.name);
        localStorage.setItem('email', res?.data?.email);
        localStorage.setItem('userid', res?.data?.userid);

        handelUserLogin()
        handleUserAddress(res?.data?.userid)
        getCartItem(res?.data?.userid)
         router.push('/menu');

      }
    } catch (error) {
      setAlert('error', 'Wrong credentials')
      console.log(error)
    }finally{
      setLoading(false)
    }
  }


   const isStrongPassword = (password) => {
    // At least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!\"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~])[A-Za-z\d!\"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]{8,}$/;
    return passwordRegex.test(password);
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

   const validateEmailPassword = () => {
    if (
      isValidEmail(formData.email) &&
      isStrongPassword(formData.password)
    ) {
      return true;
    } else {
      let newMsg = '';
      if (!isValidEmail(formData.email)) {
        newMsg += 'Enter a valid email. ';
      }
      if (!isStrongPassword(formData.password)) {
        newMsg += `Password should contain at least one uppercase letter (A-Z), one lowercase letter(a-z), one number (0-9), one special character (! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ { | } ~), & minimum length 8.`;
      }
      setMsg(newMsg.trim());
      return false;
    }
  };

  const handleContinue = ()=>{
    let res = validateEmailPassword();
    if(res == true){
      if(type == 'signup'){
        handleRegister()
      }else{
        handleLogin()
      }
    }  
  }

  useEffect(()=>{
    if(type == 'signup'){
    if(formData.email?.trim() && formData.password?.trim() && formData.name?.trim()){
     setDisable(false)
    }else{
     setDisable(true)
    }
  }else{
    if(formData.email?.trim() && formData.password?.trim()){
     setDisable(false)
    }else{
     setDisable(true)
    }
  }
  },[formData])
  
  return (
   <div className="flex flex-col lg:flex-row min-h-screen">
  <div className="flex-1 bg-[#fefafa]">
    <Link href="/" className="flex items-center gap-2">
    <div className={`text-4xl mt-10 mx-10 lg:mx-36 font-bold text-textClr transition-colors `}>
              For<span className="text-primary">ky</span>
            </div>
            </Link>
            {/* form */}
            <div className=" mt-10 flex md:justify-center lg:justify-end ">
<div className="bg-[#fcf4f4] rounded-md shadow-inner p-10 md:p-20 w-full md:w-8/12 ">
            <h1 className="text-3xl font-normal text-center text-gray-800 mb-8">
              {
                (type == 'signup') ? 'Sign Up' : 'Sign In'
              }
            </h1>

            <div className="space-y-5">
             {
              (type == 'signup') && (
                 <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={
                  (e)=>{
                    setFormData((prev)=>({
                      ...prev, name:e.target.value
                    }))
                  }
                }
                maxLength={20}
                className="w-full bg-white border-0 rounded-lg px-4 py-3 text-gray-600 placeholder:text-gray-500"
              />
              )
             }

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={
                  (e)=>{
                    setFormData((prev)=>({
                      ...prev, email:e.target.value
                    }))
                  }
                }
                className="w-full bg-white border-0 rounded-lg px-4 py-3 text-gray-600 placeholder:text-gray-500"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                onChange={
                  (e)=>{
                    setFormData((prev)=>({
                      ...prev, password:e.target.value
                    }))
                  }
                }
                  className="w-full bg-white border-0 rounded-lg px-4 py-3 pr-12 text-gray-600 placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {
              (type == 'signin') && (
                 <div className="flex items-center cursor-pointer hover:text-primary m-2 text-gray-400 mt-6">
              Forget Password?
            </div>
              )
            }
           
          {msg.length > 0 && (
                <div className="text-md mt-5 flex cursor-pointer bg-red-200 p-2 text-center text-gray-700">
                  {msg}
                </div>
              )}
            <button disabled={disable} onClick={handleContinue} className="w-full cursor-pointer bg-primary disabled:bg-[#f9a6a6] text-white font-medium py-3 rounded-lg mt-8">
              Continue
            </button>
            <div onClick={handleSignup} className="flex items-center cursor-pointer  m-2 text-gray-400 mt-6">
              {
                (type == 'signup') ? (
                  <>
                   Already have an account? <span className="hover:text-primary text-textClr ml-1 underline">Sign In</span>
                  </>
                ) : (
                  <>
                   Don't have an account? <span className=" hover:text-primary text-textClr ml-1 underline">Sign Up</span>
                  </>
                )
              }
             
            </div>
          </div>
          
            </div>
  </div>
  <div className="flex-1 relative bg-primary pt-8 lg:pt-4 flex items-center ">
     <div className="relative  rounded-md  w-full max-w-lg mx-auto h-[400px]">
            <div className="flex relative flex-col justify-center  ">
              <Image
                src={paneer}
                alt="Bicycle with calendar illustration"
                className="absolute -top-5 lg:-top-10 left-10 w-64 md:w-80"
              />
              <Image
                src={pasta}
                alt="Bicycle with calendar illustration"
                className="absolute top-10 left-40 md:left-52 md:w-80 w-48 "
              />
              <Image
                src={vegPizza}
                alt="Bicycle with calendar illustration"
                className="absolute top-20 left-2 md:left-2 md:w-72 w-60 "
              />
              <Image
                src={maggie}
                alt="Bicycle with calendar illustration"
                className="absolute top-24 md:top-28 left-28 md:left-28 md:w-72 w-60 "
              />
              
            </div>
          </div>
  </div>
</div>
  )
}

export default Signup