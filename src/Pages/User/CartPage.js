import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { useAuth } from '../../Components/UseContext/authContext'
import { useCart } from '../../Components/UseContext/CartContext'
import { toast } from 'react-hot-toast'

const CartPage = () => {
    const [auth] = useAuth();
    const [cart,setCart] = useCart();
    function handleRemoveCart(_id){
        let arr = [...cart];
        let newArr = arr.filter((element)=>{
            if(element._id!==_id){
                return element;
            }
        })
        console.log(arr)
        console.log(newArr)
        setCart(newArr);
        localStorage.setItem('cart',JSON.stringify([...newArr]));
        toast.success("Item removed");
    }
  return (
    <Layout>
      <div>
        <h1 class="text-center">Hello {auth?.user?.name}</h1>
        <h2 class="text-center">You have {cart.length} Items in your cart</h2>
        <div className="cart-content ">
          <div className="cart-item-container">
            {cart &&
              cart.map((element) => {
                return (
                  <div className="cart-item">
                    <div className=''>
                      <img
                        src={`${process.env.REACT_APP_API}/products/get/product-image/${element.slug}`}
                      ></img>
                    </div>
                    <div>
                      <h5>{element.name.substring(0, 20)}</h5>
                      <p>{element.description.substring(0, 30)}</p>
                      <p>Price: {element.price}</p>
                      <button onClick={()=>{
                        handleRemoveCart(element._id)
                      }} type="button" class="btn btn-danger">Remove</button>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="cart-checkout">
            <p>Checkout | payment</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage