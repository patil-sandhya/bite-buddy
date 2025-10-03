"use client";
import React from "react";
import { addToCart } from "@/utils/addToCart";
import { useRouter } from "next/navigation";
import { useAlertAndLoader } from "@/app/layout";
import { useAuth } from "@/context/AuthContext/Auth";
import { useCartContext } from "@/context/CartContext/CartContext";
import bigb from '@/assets/todays/bigb.webp';
import nachos from '@/assets/todays/nachos.webp';
import Image from "next/image";

const Todays = () => {
    const { isLoggedIn,userData } = useAuth();
    const { setAlert, setLoading } = useAlertAndLoader();
     const {cartItem,getCartItem} = useCartContext()
    
    const router = useRouter()
  const handleAddtoCart = async(foodId)=>{

    const isPresent = cartItem.some(item => item.foodid === foodId);
    if(isPresent){
      setAlert("success", "Item already added in cart")
      return false;
    }

    if(isLoggedIn){
      setLoading(true)
    try {
      let res = await addToCart({ userId:userData.userId, foodId, quantity: 1})
      if(res.success){
        setAlert('success', "Item added to cart")
        getCartItem(userData.userId)
      }
    } catch (error) {
      console.log(error)
      setAlert('error', 'Something went wrong')
    }finally{
      setLoading(false)
    }
    }else{
      router.push("/sign-up")
    }
   
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h4 className="text-base  font-semibold text-[#f9d649] uppercase tracking-[0.4em]">
            Today's Specials
          </h4>
          <h2 className="text-3xl hidden sm:flex justify-center my-2 md:text-4xl font-bold text-textClr mb-4">
            Hot & Handpicked Just for You
          </h2>
          <h2 className="text-3xl sm:hidden my-2 md:text-4xl font-bold text-textClr mb-4">
            Crave-Worthy Creations
          </h2>
        </div>

        <div className="flex gap-4 flex-col sm:flex-row lg:gap-0 lg:mx-14 md:mx-10  md:gap-5">
          <div className="sm:w-1/2 ">
            <div className="hidden sm:flex  ">
              <Image
                className="border my-5 bg-white rounded-2xl py-10 shadow-lg"
                src={bigb}
                alt=""
              />
            </div>
            <div className="flex sm:hidden justify-center items-center  ">
              <Image
                className="border mb-5 bg-white rounded-2xl py-5 shadow-lg"
                src={nachos}
                alt=""
              />
            </div>
            <div className="px-5 mt-5 ">
              <h4 className="text-2xl  font-semibold text-textClr">
                Mexican Nachos
              </h4>
              <p className="my-5 text-textClr w-4/5">
                Loaded, crunchy, and bursting with flavor—our Mexican nachos are the perfect blend of spice, cheese, and zest in every bite. Topped with gooey cheese, fresh salsa, and just the right amount of kick—nachos like you’ve never had before.
              </p>
              {/* <button
        className=" bg-green-600 rounded-md hover:bg-green-700 text-white font-medium px-8 py-3 transition-colors duration-200 transform -skew-x-12 hover:scale-105"
      >
        <span className="transform skew-x-12">Add To Cart</span>
      </button> */}
              <button
              onClick={() => handleAddtoCart("6834534bbe68f40ccd244e4c")}
                className="mt-2 inline-block bg-[#f96d6d]  rounded-md hover:bg-primary text-white font-medium px-8 py-3 transition-all duration-200 hover:scale-105"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 25px) 0, 100% 100%, 0 100%)",
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
                {/* second div */}
          <div className="sm:w-1/2 flex flex-col-reverse sm:flex-col  ">
            <div className="px-5 mt-8 sm:my-5">
              <h4 className="text-2xl  font-semibold text-textClr">
                Pretty Big Burger
              </h4>
              <p className="my-5 w-4/5 text-textClr">
                Our burger is packed with flavor and grilled to perfection—every
                bite is pure satisfaction. Made with 100% fresh ingredients and
                stacked high with melty cheese, crispy veggies, and secret sauce
                magic.
              </p>
               <button
              onClick={() => handleAddtoCart("683443f4be68f40ccd244e34")}
                className="mt-2 inline-block bg-[#f96d6d]  rounded-md hover:bg-primary text-white font-medium px-8 py-3 transition-all duration-200 hover:scale-105"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 25px) 0, 100% 100%, 0 100%)",
                }}
              >
                Add To Cart
              </button>
              {/* <button onClick={() => handleAddtoCart("683443f4be68f40ccd244e34")} className="mt-2 bg-[#f96d6d] rounded-md hover:bg-primary text-white font-medium px-8 py-3 transition-colors duration-200 transform -skew-x-12 hover:scale-105">
                <span className="transform skew-x-12">Add To Cart</span>
              </button> */}
            </div>
            <div className="hidden sm:flex lg:mt-5 ">
              <Image
                className="border bg-white lg:max-w-[500px] lg:mt-5 md:mt-16 rounded-2xl py-8 shadow-lg"
                src={nachos}
                alt=""
              />
            </div>
            <div className="flex sm:hidden justify-center items-center ">
              <Image
                className="border bg-white mt-5 lg:mt-5 md:mt-14 rounded-2xl py-8 shadow-lg"
                src={bigb}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Todays;
