import Features from '@/Components/Home/Features'
import Footer from '@/Components/Home/Footer'
import Hero from '@/Components/Home/Hero'
import Navbar from '@/Components/Home/Navbar'
import Subscribe from '@/Components/Home/Subscribe'
import Todays from '@/Components/Home/Todays'
import React from 'react'

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Todays />
      <Subscribe />
      <Footer />
    </div>
  )
}

export default LandingPage