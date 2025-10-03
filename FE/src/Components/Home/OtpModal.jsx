'use client'
import { useAlertAndLoader } from '@/app/layout';
import { X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const OTPModal = ({
  isOpen,
  onClose,
//   smsOtp,
}) => {
  const [smsOtp, updateSms] = useState(['', '', '', '','','']);
  const [disableVerifyBtn, setDisableVerifyBtn] = useState(true);
  const [disabledResend, setDisableResend] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);
  const { setAlert } = useAlertAndLoader();

  const handleChange = (index, value) => {
    const newOTP = [...smsOtp];
    newOTP[index] = value;
    updateSms(newOTP);
    if (value && index < 5) {
      document.getElementById(`smsOtp-${index + 1}`).focus();
    }
  };
 

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('Text');
    if (/^\d{6}$/.test(pastedText)) {
      const newOTP = pastedText.split('').slice(0, 6);
      updateSms(newOTP);
    }
  };

 

  const handleBackspace = (index, e) => {
    if (e.key === 'Backspace' && !smsOtp[index] && index > 0) {
      document.getElementById(`smsOtp-${index - 1}`).focus();
    }
  };
 

  const firstSmsInputRef = useRef(null);

  const handleClose = () => {
    onClose();
  };

  const handleResendOTP = () => {
    setDisableResend(true);
    setResendTimer(120); // 2 minutes timer (120 seconds)
    // Additional logic for actual resend OTP functionality goes here
  };

  const validateForm = () => {
    if (smsOtp.join('').length == 6) {
        setDisableVerifyBtn(false);
      } else {
        setDisableVerifyBtn(true);
      }
  };

  const verifyOtp = ()=>{
    setAlert("success","Thank you!")
    onClose();
  }

  useEffect(() => {
    validateForm();
  }, [smsOtp]);

  useEffect(() => {
    if (smsOtp) {
      if (isOpen) {
        firstSmsInputRef.current.focus();
      }
    }
  }, [isOpen]);
//   useEffect(() => {
//     let intervalId;

//     if (resendTimer > 0) {
//       intervalId = setInterval(() => {
//         setResendTimer((prevTime) => prevTime - 1);
//       }, 1000);
//     } else {
//       clearInterval(intervalId);
//       setDisableResend(false); // Enable Resend OTP button when timer reaches 0
//     }

//     return () => clearInterval(intervalId);
//   }, [resendTimer]);

  useEffect(() => {
    handleResendOTP();
  }, []);

  // console.log(emailOtp, smsOtp)
  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center`}
    >
      <div className="fixed left-0 top-0 z-40 h-full w-full bg-black opacity-70"></div>
      <div className="absolute left-1/2 top-1/2 bg-white  z-50 -translate-x-1/2 -translate-y-1/2 transform rounded p-4 shadow-md">
        <div className="mb-4 flex justify-between ">
          <h2 className="text-lg font-semibold text-primary">Enter OTP</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X />
          </button>
        </div>
        <div>
          {smsOtp && (
            <>
              <h3 className="m-1 font-semibold text-gray-700">SMS OTP</h3>
              <div className="flex justify-center">
                {smsOtp.map((value, index) => (
                  <input
                    key={index}
                    id={`smsOtp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    className=" mx-1 h-12 w-12 rounded border border-gray-300 text-center focus:outline-none"
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onPaste={handlePaste}
                    onKeyDown={(e) => handleBackspace(index, e)}
                    ref={index === 0 ? firstSmsInputRef : null}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        <button
          disabled={disabledResend}
        //   onClick={sendOtp}
          className=" my-2 text-primary  underline disabled:text-gray-500"
        >
          {/* Resend OTP {resendTimer > 0 ? `in ${resendTimer} seconds` : ''} */}
        </button>

        <div className="flex flex-col items-center justify-center">
          
          <button
            disabled={disableVerifyBtn}
            onClick={verifyOtp}
            className="mt-2 w-5/12 rounded-full border bg-primary px-2 py-2  text-lg text-white disabled:bg-gray-300 disabled:text-gray-500 "
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
