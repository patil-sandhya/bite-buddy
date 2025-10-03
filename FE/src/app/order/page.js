import Navbar from '@/Components/Home/Navbar'
import Order from '@/Components/Order/Order'
import PrivateRoute from '@/PrivateRoute/PrivateRoute'

const OrderPage = () => {
  return (
    <>
    <PrivateRoute>
    <Navbar />
    <Order />
    </PrivateRoute>
    </>
  )
}

export default OrderPage