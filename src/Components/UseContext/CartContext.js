import React,{useState,useContext,createContext, useEffect} from 'react'

const CartContext = createContext();
const CartProvider = ({children}) => {
    const [cart,setCart] = useState([]);

    //Use effect for getting the initial value of the cart items
    useEffect(()=>{
        let items = localStorage.getItem('cart');
        if(items){
            setCart(JSON.parse(items));
        }
    },[])

  return (
    <CartContext.Provider value={[cart,setCart]}>
    {children}
    </CartContext.Provider>
  );
}

const useCart=()=> useContext(CartContext);

export {useCart,CartProvider};