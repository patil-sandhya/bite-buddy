import Cart from '@/Components/Cart/Cart'
import Navbar from '@/Components/Home/Navbar'
import PrivateRoute from '@/PrivateRoute/PrivateRoute'

const CartPage = () => {
  return (
    <>
    <PrivateRoute>
    <Navbar />
    <Cart />
    </PrivateRoute>
    </>
  )
}

export default CartPage