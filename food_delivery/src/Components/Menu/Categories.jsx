import React from 'react'
import Image from 'next/image';
import pizzaImg from '@/assets/category/pizza.png';
import allImg from '@/assets/category/all.jpg';
import biryaniImg from '@/assets/category/biryani.png';
import burgerImg from '@/assets/category/burger.png';
import dessertImg from '@/assets/category/dessert.png';
import mexicanImg from '@/assets/category/mexican.png';
import specialImg from '@/assets/category/special.png';

const categoryList = [
    {
        "name":"All",
        "picture": allImg
    },
    {
        "name":"Pizza",
        "picture": pizzaImg
    },
    {
        "name":"Burger",
        "picture": burgerImg
    },
    {
        "name":"Biryani",
        "picture": biryaniImg
    },
    {
        "name":"Mexican Food",
        "picture": mexicanImg
    },
    {
        "name":"Our Special",
        "picture": specialImg
    },
    {
        "name":"Dessert",
        "picture": dessertImg
    },

]

const Categories = ({handleCategory, selectedMenu}) => {
  return (
    <>
    <div className="custom-scrollbar flex mx-5 gap-5 md:mx-10 md:gap-4 lg:gap-6 overflow-x-auto whitespace-nowrap pb-2">
    {
        categoryList.map((menu, index)=>{
            return (
                <div key={index} onClick={()=> handleCategory(menu.name)}  className='flex cursor-pointer justify-center items-center flex-col '>
                    <div className=''>
                        <Image width={128} height={128} src={menu.picture} alt="" className='h-32 min-h-32 max-w-32 w-32 ' />
                    </div>
                    <p className={`font-semibold ${(selectedMenu == menu.name) ? 'text-primary' : 'text-textClr'}`}>{menu.name}</p>
                </div>
            )
        })
    }
    </div>
    </>
  )
}

export default Categories