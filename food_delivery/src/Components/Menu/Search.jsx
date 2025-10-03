'use client'
import { useAlertAndLoader } from '@/app/layout';
import { X, SearchIcon } from 'lucide-react';
import {useState} from 'react'


let timeout = null;
const debounce = (func, delay) => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    func();
    timeout = null;
  }, delay);
};

const Search = ({fetchMenu}) => {
  const [searchText, setSearchText] = useState('');
  const { setAlert, setLoading } = useAlertAndLoader();
  
  const handleTextChange = (e) => {
    const input = e.target.value.trim();
    setSearchText(input);
    // setLoading(true);
    debounce(() => fetchMenu(searchText,"search"), 700);
  };
  return (
    <div className=' '>
        {/* <div className="mx-2 flex flex-col gap-3 p-2 pb-5 text-gray-800"> */}

              <>
                <div>
          <h3 className="text-md m-2 font-semibold ">Find Your Favorite Food</h3>

                  <div className="flex items-center justify-between rounded-full border-2 pr-2 focus-within:border-primary">
                    <div className="flex w-11/12 gap-2">
                      <div className="ml-4 flex items-center justify-center">
                        <SearchIcon />
                      </div>
                      <input
                        type="text"
                        value={searchText}
                        onChange={handleTextChange}
                        placeholder="search by name"
                        className="block w-full bg-transparent rounded-full py-2 focus:border-0 focus:outline-0"
                        // autoFocus={true}
                      />
                    </div>
                    <div
                      onClick={() => setSearchText('')}
                      className="cursor-pointer "
                    >
                      {searchText && <X />}
                    </div>
                  </div>
                </div>
               
              </>
            {/* </div> */}
    </div>
  )
}

export default Search