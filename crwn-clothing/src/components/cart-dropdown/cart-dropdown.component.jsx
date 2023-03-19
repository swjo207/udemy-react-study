import './cart-dropdown.styles.scss'; 
import Button from '../button/button.component'; 
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context'; 
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext); 
  const navigate = useNavigate(); 

  const goToCheckoutHandler = () => navigate('/checkout'); 

  return (
    <div className='cart-dropdown-container'>
        <div className='cart-item' />
        {cartItems.map((item) => {
          return <CartItem key={item.id} cartItem={item} />
        }
        )}
        <Button onClick={goToCheckoutHandler}>Go to checkout.. </Button>
    </div>
  )
}

export default CartDropdown; 