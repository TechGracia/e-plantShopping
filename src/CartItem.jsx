import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.cost * item.quantity, 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(); // Call the function passed from the parent component
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 })); // Dispatch update quantity with item's id
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 })); // Dispatch update quantity with item's id
    } else {
      dispatch(removeItem({ id: item.id })); // Remove item if quantity goes to 0
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ id: item.id })); // Remove item by id
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (item.cost * item.quantity).toFixed(2); // Calculate subtotal for this item
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <h2 style={{ color: 'black' }}>Your cart is empty.</h2>
      ) : (
        <>
          <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
          <div>
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}> {/* Use unique ID for key */}
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">${item.cost.toFixed(2)}</div>
                  <div className="cart-item-quantity">
                    <button 
                      className="cart-item-button cart-item-button-dec" 
                      onClick={() => handleDecrement(item)} 
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      -
                    </button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button 
                      className="cart-item-button cart-item-button-inc" 
                      onClick={() => handleIncrement(item)} 
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div> {/* Displays subtotal */}
                  <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
