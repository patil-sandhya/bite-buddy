'use client'
import { ChevronDown, ChevronUp } from 'lucide-react';
import {useState, useEffect, useRef} from 'react'
import Search from './Search';
import Location from './Location';
import Categories from './Categories';
import MenuApi from '@/Services/MenuApi';
import MenuCard from './MenuCard';
import { useAlertAndLoader } from '@/app/layout';

const filterOptions = [
    {
        "All":'all'
      },
    {
        "Pizza":'pizza'
      },
    {
        "Burger": 'burger'
      },
    {
        "Biryani":"biryani"
      },
    {
        "Mexican Food": 'mexican'
      },
    {
        "Our Special":"special"
      },
    {
        "Dessert":'desserts'
      }
]
 const sortOptions = [
  'Low to High',
  'High to Low'
];

const Menu = () => {
  const filterStatusRef = useRef(null);
  const [filteredOption, setFilteredOption] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [category, setCategory] = useState("All")
  const sortStatusRef = useRef(null);
  const [sortedOption, setsortedOption] = useState('Sort by');
  const [sortOpen, setsortOpen] = useState(false);
const { setAlert, setLoading } = useAlertAndLoader();

  const [menus, setMenus] = useState(null);

  const fetchMenu = async (filterVal, fetchby="category")=>{
    // console.log("fetch menu val",filterVal)
    setLoading(true)
    try {
      let res = await MenuApi.get_allmenu(filterVal,fetchby)
      // console.log(res)
        // setAlert('success', "data fetch successfuly")
      if(res.data){
        setMenus(res.data)
        if(fetchby !== "category"){
          setsortedOption('Sort by')
          setFilteredOption('All')
        }
        if(sortedOption !== 'Sort by'){
          sortMenu(sortedOption, res.data)
        }
      }
    } catch (error) {
      console.log(error)
      setAlert("error", "Something went wrong, try after sometime")
    }finally{
      setLoading(false)
    }
  }

  const sortMenu = (value, newMenu=menus)=>{
    if(value === 'Low to High'){
      const lowToHigh = [...newMenu].sort((a, b) => a.price - b.price);
      setMenus(lowToHigh)
    }else{
      const highToLow = [...newMenu].sort((a, b) => b.price - a.price);
      setMenus(highToLow)
    }
  }


 const toggleFilterDropdown = () => {
    setFilterOpen(!filterOpen);
  };

  const handleFilterOptionSelect = (option) => {
    const optionVal = filterOptions.find(item => item[option] !== undefined);
    setFilteredOption(option);
    setFilterOpen(false);
    fetchMenu(optionVal[option])
  };

  const togglesortDropdown = () => {
    setsortOpen(!sortOpen);
  };

  const handlesortOptionSelect = (option) => {
    setsortedOption(option);
    setsortOpen(false);
    sortMenu(option)
  };

  const handleSortMouseDown = (event) => {
    if (sortStatusRef.current && !sortStatusRef.current.contains(event.target)) {
      // console.log('inside here');
      setsortOpen(false);
    }
  };

    const handleFIlterMouseDown = (event) => {
    if (
      filterStatusRef.current &&
      !filterStatusRef.current.contains(event.target)
    ) {
      setFilterOpen(false);
    }
  };

  const handleCategory = (value) =>{
    setCategory(value)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleFIlterMouseDown);
    document.addEventListener('mousedown', handleSortMouseDown);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleFIlterMouseDown);
      document.removeEventListener('mousedown', handleSortMouseDown);
    };
  }, []);


  console.log(menus)
  useEffect(()=>{
    fetchMenu("All")
  },[])

  // useEffect(()=>{
  //   if(sortedOption !== 'Sort by'){
  //     sortMenu(sortedOption)
  //   }
  // },[])

  return (
    <div className='pt-20 pb-10 px-4 sm:px-5 bg-white text-textClr'>

        <div className='bg-[#fcf4f4] flex justify-center items-center py-5' >
            <Categories handleCategory={handleFilterOptionSelect} selectedMenu={filteredOption}/>

        </div>
        {/* filter, sort, location, search */}
        <div className='my-5 flex flex-col md:flex-row md:justify-between'>
            <div className='flex md:w-1/2 gap-2 sm:gap-0 items-center   justify-start '>
            <div className="my-2  md:m-2 lg:m-5" ref={filterStatusRef}>
          <h3 className="text-md m-2 font-semibold">Filter Status</h3>
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex w-40 sm:w-44 items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={toggleFilterDropdown}
              >
                {filteredOption}
                {filterOpen ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </button>
            </div>
            {filterOpen && (
              <div className="absolute z-[1] mt-1 w-44 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {filterOptions.map((option) => {
                    const [label, value] = Object.entries(option)[0];
                    return (
                    <button
                      key={value}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#CAF0F8]"
                      role="menuitem"
                      onClick={() => handleFilterOptionSelect(label)}
                    >
                      {label}
                    </button>
                    )
                  }
                     
                    
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
            {/* Sort  */}
        <div className="my-2  md:m-2 lg:m-5" ref={sortStatusRef}>
          <h3 className="text-md m-2 font-semibold">Sort By Price</h3>
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex w-40 sm:w-44 items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={togglesortDropdown}
              >
                {sortedOption}
                {sortOpen ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </button>
            </div>
            {sortOpen && (
              <div className="absolute z-[1] mt-1 w-44 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#CAF0F8]"
                      role="menuitem"
                      onClick={() => handlesortOptionSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
            </div>
            {/*  filter */}
        
        <div className='flex md:w-1/2 flex-col-reverse md:flex-row md:items-center md:ml-1 lg:ml-5 lg:justify-end gap-2 lg:gap-5'>
            <Search fetchMenu={fetchMenu} />
            <Location />
        </div>
        </div>
            
        {/* image filter */}
        <div className='mx-1 flex  gap-8 flex-wrap justify-center mb-5'>
          {
            menus?.length < 1 && (
              <div className='md:w-3/5 w-full m-5 p-5 font-semibold shadow-lg rounded-2xl bg-primary text-white text-2xl text-center'>
                We’re cooking up lots of options—try searching something else!
              </div>
            )
          }
          {
            menus && (
              <>
              {
                menus.map((item, index)=>{
                  return <MenuCard key={index} {...item} />
                })
              }
              </>
            )
          }
        </div>
    </div>
  )
}

export default Menu