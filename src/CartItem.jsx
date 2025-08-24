import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping , onRemoveFromCart }) => {

  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  
  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
  
    const totalAmount = cart.reduce((total, item) => {
      const itemTotal = parseFloat(item.cost.replace('$', '')) * item.quantity;
      return total + itemTotal;
    }, 0).toFixed(2);

    return totalAmount;

  };

  const handleContinueShopping = (e) => {
   onContinueShopping(e);
  };


  const handleIncrement = (item) => {
    const newQuantity = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));   

  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));   
    }else {
      // Optionally, you can remove the item if quantity reaches zero
      dispatch(removeItem(item.name));
      if (onRemoveFromCart) {
        onRemoveFromCart(item.name); // Notify parent to re-enable button
      }
    } 
   
  };

  const handleRemove = (item) => {
    console.log("Removing item:", item); // Log the item to be removed
    dispatch(removeItem(item.name));
    if (onRemoveFromCart) {
      onRemoveFromCart(item.name); // Notify parent to re-enable button
    }    
  };

  const handleCheckoutShopping = (e) => {
      alert('Check out will be added in the future release');
  };

  // This is to calculate cost of individual item based on quantity
  const calculateTotalCost = (item) => {
    return (item.cost.replace('$', '') * item.quantity).toFixed(2);
    
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            { /* Image of plant */ }      
              <img className="cart-item-image" src={item.image} alt={item.name} />
            
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              
              <div className="cart-item-quantity">
                
                { /* Increment button*/ }      
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                
                { /* Increment button*/ }
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              
              { /* Delete button*/ } 
              <button className="cart-item-delete" onClick={() => { console.log("Clicked delete button"); handleRemove(item); }}>Delete</button>
            </div>

          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


