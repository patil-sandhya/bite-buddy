'use client';
import ApiSercies from '@/Services/CommonApi';
import { createContext, useContext, useEffect, useReducer } from 'react';

const AuthContext = createContext();

const authReducerFunc = (data, action) => {
  switch (action.type) {
    case 'userLogin':
      return { ...data, isLoggedIn: true, userData:action.data };
    case 'userAddress':
      return { ...data, isLoggedIn: true, userAddress:action.data };
    case 'userLogout':
      return { ...data, isLoggedIn: false };
    default:
    // console.error('invalid action type for auth reducer');
  }
};

export const AuthProvider = ({ children }) => {
  const [{ isLoggedIn, userData, userAddress }, setAuth] = useReducer(authReducerFunc, {
    isLoggedIn: false,
  });

  const handelUserLogin = () => {
    //console.log(getUserData);
    const dataObj = {
        name: localStorage.getItem('name'),
        email : localStorage.getItem('email'),
        userId : localStorage.getItem('userid')
    }
    setAuth({ type: 'userLogin', data: dataObj});
  };

  const handleUserLogout = () => {
    setAuth({ type: 'userLogout' });
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('userid');
  };

  const handleUserAddress = async(userid)=>{
     try {
    const res = await ApiSercies.get_userAddress(userid);
    console.log('User address:', res.data.address);
    setAuth({ type: 'userAddress', data: res.data.address});
  } catch (err) {
    console.log('Error fetching address:');
  }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
       const userId = localStorage.getItem('userid')

      handelUserLogin();
      handleUserAddress(userId)
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        handelUserLogin,
        handleUserLogout,
        userData,
        userAddress,
        handleUserAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
