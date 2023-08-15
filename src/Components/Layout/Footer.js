import React from 'react'
import { BiHomeAlt } from 'react-icons/bi';
import { LiaProductHunt } from 'react-icons/lia';
import { RxDashboard } from 'react-icons/rx';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div>

    <div className='bg-dark text-light p-3 footer'>
      <h4 className='text-center'>All Right Reserved &copy; ecomm</h4>
      <p className='text-center mt-3'>
        <Link to="/about">About</Link>
        |
        <Link to="/contact">Contact</Link>
        |
        <Link to="/privacy">Privacy Policy</Link>
      </p>
    </div>
    {/* // Footer for mobile  */}
    <div className='for-mobile footer-mobile'>
      <div>
        <NavLink to="/" className="footer-mob-link-container">
          <BiHomeAlt></BiHomeAlt>
            <p>Home  </p>
        </NavLink>
      </div>
      <div>
      <NavLink to="/products" className="footer-mob-link-container">
      <LiaProductHunt></LiaProductHunt>
        <p>Products  </p>
        </NavLink>
      
      </div>
      <div>
      <NavLink to="/dashboard/user" className="footer-mob-link-container">
      <RxDashboard></RxDashboard>
        <p>Dashboard  </p>
        </NavLink>
      
    
      </div>
      <div>
      <NavLink to="/dashboard/user/profile" className="footer-mob-link-container">
      <CgProfile></CgProfile>
        <p>Account</p>
        </NavLink>
      
      </div>
      <div>
      <NavLink to="/dashboard/cart" className="footer-mob-link-container">
      <AiOutlineShoppingCart></AiOutlineShoppingCart> 
        <p>Cart </p>
        </NavLink>
      
      </div>
    </div>
    </div>


  )
}

export default Footer;