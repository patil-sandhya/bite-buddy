'use client';
import { createContext, useState, useContext, useEffect } from 'react';
import Loader from './Loader';
import Alert from './Alert';

const AlertAndLoaderContext = createContext();

export const AlertAndLoaderProvider = ({ children }) => {
  const [alertArray, setAlertArray] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const removeAlert = (removeId) => {
    setAlertArray((arr) => arr.filter(({ key }) => key != removeId));
  };

  const setAlert = (type, msg) => {
    const id = Date.now();
    setAlertArray((arr) => [
      ...arr,
      <Alert id={id} key={id} alertType={type} message={msg} />
    ]);

    setTimeout(() => {
      removeAlert(id);
    }, 5000);
  };
  return (
    <AlertAndLoaderContext.Provider value={{ setAlert, isLoading, setLoading }}>
      {isLoading && <Loader />}
      {children}
      {alertArray.length !== 0 && (
        <div className="fixed left-1/2 top-10 z-50 w-11/12 -translate-x-1/2 gap-1 sm:w-fit">
          {alertArray?.map((item, index) => (
            <div key={index} className="relative">
              {item}
            </div>
          ))}
        </div>
      )}
    </AlertAndLoaderContext.Provider>
  );
};

export const useAlertAndLoader = () => useContext(AlertAndLoaderContext);
