import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeItem, clearCart } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const dispatch = useDispatch();

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item));
    };

    const handlePurchase = () => {
        if (cartItems.length > 0) {
            alert('Thank you very much for your purchase!');
            dispatch(clearCart()); // Opcional: limpiar el carrito después de la compra
        } else {
            alert('Your cart is empty!');
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (parseFloat(item.cost.substring(1)) * item.quantity);
        }, 0).toFixed(2);
    };

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2>Total Cart Items: {totalQuantity}</h2>
            </div>
            
            <div className="cart-items-list">
                {cartItems.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        
                        <div className="cart-item-main">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-price">{item.cost}</div>
                        </div>
                        
                        <div className="cart-item-quantity">
                            <button className="qty-btn" onClick={() => handleDecrement(item)}>-</button>
                            <span className="qty-value">{item.quantity}</span>
                            <button className="qty-btn" onClick={() => handleIncrement(item)}>+</button>
                        </div>
                        
                        <div className="cart-item-total">
                            ${(parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2)}
                        </div>
                        
                        <button className="delete-btn" onClick={() => handleRemove(item)}>
                            ×
                        </button>
                    </div>
                ))}
            </div>
            
            {cartItems.length > 0 && (
                <div className="cart-footer">
                    <div className="cart-total">
                        <strong>Total: ${calculateTotal()}</strong>
                    </div>
                    <div className="cart-actions">
                        <button className="purchase-btn" onClick={handlePurchase}>
                            Purchase
                        </button>
                        <button className="continue-btn" onClick={onContinueShopping}>
                            Continue Shopping
                        </button>
                    </div>
                </div>
            )}
            
            {cartItems.length === 0 && (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <button className="continue-btn" onClick={onContinueShopping}>
                        Continue Shopping
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartItem;