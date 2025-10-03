'use client'
import { CrossIcon, LocateIcon, MapPin, X } from 'lucide-react'
import {useState} from 'react'

const Location = () => {
      const [location, setLocation] = useState('');

      const handleTextChange = (e) => {
        const input = e.target.value.trim();
        setLocation(input);
      };
  return (
    <div className='md:4/12 lg:w-3/12 w-1/2'>
        <>
        <div>
          <h3 className="text-md m-2 font-semibold ">Location</h3>

                  <div className="flex items-center justify-between rounded-full border-2 pr-2 focus-within:border-primary">
                    <div className="flex md:w-11/12 gap-2">
                      <div className="ml-4 flex items-center justify-center">
                        <MapPin />
                      </div>
                      <input
                        type="text"
                        value={location}
                        onChange={handleTextChange}
                        placeholder="Delhi"
                        className="block w-full bg-transparent rounded-full py-2 focus:border-0 focus:outline-0"
                        // autoFocus={true}
                      />
                    </div>
                    <div
                      onClick={() => setLocation('')}
                      className="cursor-pointer "
                    >
                      {location && <X />}
                    </div>
                  </div>
                </div>
        </>
    </div>
  )
}

export default Location