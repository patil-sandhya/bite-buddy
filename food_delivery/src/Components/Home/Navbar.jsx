"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, List, LogOut, Menu, X } from "lucide-react"
import {  usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext/Auth"
import { useAlertAndLoader } from "@/app/layout"

const ProfileDropDown = ({ userDetails, closeFunc }) => {
  const { handleUserLogout } = useAuth();
  const { setAlert, setLoading } = useAlertAndLoader();
  const dropdownRef = useRef(null);
  const router = useRouter();
  const handelLogout = () => {
    handleUserLogout();
setAlert('success', 'Successfully Logout')
    router.push('/sign-up');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeFunc();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeFunc]);

  return (
    <>
      <div
        ref={dropdownRef}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
        autoFocus
        tabIndex={-1}
        className="absolute text-textClr z-[1] w-[300px] -translate-x-[75%] sm:-translate-x-[80%] translate-y-[58%] rounded-lg border-2 bg-white text-sm shadow-xl "
      >
        <div className="flex  items-center gap-2 border-b p-5">
          <div className="w-[30%]">
            <div className="box-content flex h-[30px] w-[30px]  items-center justify-center rounded-full bg-gradient-to-r from-[#bb1212] to-[#dc4e4e] p-2 capitalize text-white">
              {userDetails?.name[0]}
            </div>
          </div>
          <div className="flex-start flex w-full  flex-col">
            <div className="break-all  font-medium">
              {userDetails?.name} 
            </div>
            <div className="break-all"> {userDetails?.email} </div>
          </div>
        </div>
        <ul className="mt-2 text-base " role="menuitem"> 
          <li role="menuitem">
            <Link href="/order" >
            <button
              // onClick={handelLogout}
              className="flex w-full items-center gap-3 px-5 py-3 hover:bg-gray-100"
            >
              <List /> Orders
            </button>
            </Link>
          </li>
          <li role="menuitem">
            <button
              onClick={handelLogout}
              className="flex w-full items-center gap-3 px-5 py-3 hover:bg-gray-100"
            >
              <LogOut /> Logout
            </button>
          </li>
        </ul>

        {/* <p className="p-2 text-xs "> USER ID: 34565 </p> */}
      </div>
    </>
  );
};


const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isLoggedIn,userData } = useAuth();
const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("Home")
// console.log("log", isLoggedIn)
    const pathName = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(()=>{
    if(pathName.startsWith('/menu')){
      setActiveTab('Menu')
    }else
     if(pathName.startsWith('/about')){
      setActiveTab('About')
    }else
     if(pathName.startsWith('/cart')){
      setActiveTab('Cart')
    }else
     if(pathName.startsWith('/order')){
      setActiveTab('Order')
    }else{
      setActiveTab("Home")
    }
  },[pathName])

  // console.log('active tab', activeTab)

  return (
    <nav
      className={`fixed top-0 text-textClr left-0 right-0 z-50 transition-all duration-300 ${
        (isScrolled || pathName != '/')? "bg-[#f7eded] backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            
            <div className={`text-xl font-bold text-textClr transition-colors `}>
              For<span className="text-primary">ky</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            
            <Link
              href="/about" className={`relative group hover:text-primary transition-colors ${(activeTab == 'About') ? 'text-primary' : 'text-textClr'}`}
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/menu" className={`relative group  hover:text-primary transition-colors ${(activeTab == 'Menu') ? 'text-primary' : 'text-textClr'}`}>
              Menu
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            {
              isLoggedIn && (
                 <Link href="/cart" className={`relative group hover:text-primary transition-colors ${(activeTab == 'Cart') ? 'text-primary' : 'text-textClr'} `}>
              Cart
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
              )
            }
            {
              isLoggedIn && (
                 <Link href="/order" className={`relative group hover:text-primary transition-colors ${(activeTab == 'Orders') ? 'text-primary' : 'text-textClr'} `}>
              Orders
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
              )
            }
            {
              !isLoggedIn && (
 <Link
              href="/sign-up"
              className="bg-primary hover:bg-coral-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              Login
            </Link>
              )
            }
           
          </div>
          {
            !isLoggedIn && (
               <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 transition-all duration-300 text-textClr hover:text-primary hover:scale-110 hover:rotate-180"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
            )
          }
{
            isLoggedIn && (
          <div className="flex">

            <div
          onBlur={() => setShowProfile(false)}
          onClick={() => setShowProfile(true)}
          className="relative flex cursor-pointer items-center gap-1.5 rounded-full"
        >
          {showProfile && (
            <ProfileDropDown
              userDetails={userData}
              closeFunc={() => setShowProfile(false)}
            />
          )}
          <span className="flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#bb1212] to-[#dc4e4e] p-3 text-center font-semibold capitalize text-white">
            {userData?.name[0]}
          </span>
          <ArrowRight className="rotate-90" />
        </div>
        <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 transition-all duration-300 text-textClr hover:text-primary hover:scale-110 hover:rotate-180"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          </div>
            )
          }
       
          
          {/* Mobile Menu Button */}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-[#f7eded] pb-4 border-t border-gray-200/20">
            <div className="flex flex-col gap-4 p-4">
              
              <Link
                href="/about"
                className={`hover:text-coral-500 transition-colors text-textClr`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/menu"
                className={`hover:text-coral-500 transition-colors text-textClr`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu
              </Link>
              {
                isLoggedIn && (
<Link
                href="/cart"
                className={`hover:text-coral-500 transition-colors text-textClr`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart
              </Link>
                )
              }
               {
                isLoggedIn && (
                  <Link
                href="/order"
                className={`hover:text-coral-500 transition-colors text-textClr`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Orders
              </Link>
                )
              }
              
              
             {
              !isLoggedIn && (
                 <Link
                href="/sign-up"
                className="bg-primary hover:bg-coral-600  px-6 text-white py-2 rounded-full transition-colors w-fit"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              )
             }
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar