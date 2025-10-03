'use client'
import { Play, MapPin } from "lucide-react"
import fruitsImg from '@/assets/banner/fruitsImg.jpg';
import pavBhajiImg from '@/assets/hero/pavBhaji.png';
import cake from '@/assets/hero/cake.png';
import fastFood from '@/assets/hero/fastFood.png';


import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
     <section className="w-full relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
  src={fruitsImg}
  alt="Fresh fruits background"
  className="w-full h-full object-cover"
/>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/70"></div>
      </div>

      {/* Decorative Elements */}
      
      <div className="absolute bottom-32 left-16 w-6 h-6 bg-orange-400 rounded-sm transform rotate-12 z-10"></div>
      <div className="absolute top-20 right-1/4 w-16 h-16 bg-coral-500/20 rounded-full hidden sm:flex items-center justify-center z-10">
        <MapPin className="w-8 h-8 text-coral-500" />
      </div>

      <div className="container  mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="flex flex-col  lg:flex-row items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="lg:w-1/2 md:pl-10  mb-12 lg:mb-0">
            <h1 className="text-4xl text-textClr md:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight mb-6">
              Fastest <span className="text-primary">Food</span>
              <br />
              <span className="text-primary">Delivery</span> &
              <br />
              Easy <span className="text-navy-900">Pickup</span>
            </h1>
            <p className="text-gray-700 text-lg mb-8 max-w-lg font-medium">
              Get your favorite meals delivered hot and fresh—right when you want them. From local favorites to global bites, we bring great food straight to your door with just a few taps. Fast, easy, and always delicious.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/menu" >
              <button className="bg-primary hover:bg-coral-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors shadow-lg">
                Crave Corner
              </button>
              </Link>
              <Link href="/sign-up">
              <button className="flex items-center justify-center gap-3 text-primary px-6 py-4 rounded-full border border-primary hover:bg-white/80 transition-colors bg-white/60 backdrop-blur-sm">
                Sign Up
              </button>
              </Link>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="mt-10 lg:mt-0 w-full lg:w-1/2 relative">
  <div className="relative  w-full max-w-lg mx-auto h-[400px]">
    {/* First Image */}
     <Image
      src={pavBhajiImg}
      alt="Food Delivery Illustration"
      className="absolute -top-10 left-4 md:left-10 w-64 md:w-80"
     
    />
    <img
      src="https://png.pngtree.com/png-vector/20231018/ourmid/pngtree-fast-foods-item-png-image_10303953.png"
      alt="Food Delivery Illustration"
       className="absolute top-16 md:top-10 left-40 md:left-52 md:w-auto w-52 "
    />
    <Image
      src={cake}
      alt="Food Delivery Illustration"
       className="absolute bottom-10 md:bottom-1 md:left-10 md:w-60 w-52 "
    />

    {/* Second Image */}
   
  </div>
</div>
        </div>
      </div>
    </section>
  )
}
