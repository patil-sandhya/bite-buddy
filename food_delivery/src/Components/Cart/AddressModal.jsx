import { useAlertAndLoader } from "@/app/layout";
import { useAuth } from "@/context/AuthContext/Auth";
import ApiSercies from "@/Services/CommonApi";
import { useEffect, useState } from "react";

export default function AddressModal({ isOpen, onClose }) {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });
  const { setAlert, setLoading } = useAlertAndLoader();
  const { userData, handleUserAddress} = useAuth();
  const [disable, setDisable] = useState(true);
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let data = {
        firstName: address.name,
        phone: address.phone,
        street: address.street,
        city: address.city,
        pincode: address.pincode,
      };
      let res = await ApiSercies.put_address(userData.userId, data);
      console.log(res);
      if (res.status == 200) {
        setAlert("success", "Location saved! You're all set.");
       handleUserAddress(userData.userId)
      }
    } catch (error) {
      console.log(error);
      setAlert("error", 'Failed to save address. Please try again.')
    } finally {
      setLoading(false);
      onClose();
    }
  };

  useEffect(() => {
    if (
      address.name.trim() &&
      address.city.trim() &&
      address.pincode.trim() &&
      address.street.trim()
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [address]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

        <div className="space-y-3">
          <input
            type="text"
            name="name"
            value={address.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="text"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            maxLength={10}
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            maxLength={30}
            placeholder="Street Address"
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="text"
            name="pincode"
            value={address.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            maxLength={6}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={disable}
          className="mt-4 w-full disabled:bg-[#f9a6a6] bg-primary hover:bg-coral-600 text-white py-2 rounded"
        >
          Save Address
        </button>
      </div>
    </div>
  );
}
