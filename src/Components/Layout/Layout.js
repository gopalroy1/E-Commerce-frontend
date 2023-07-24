import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

const Layout = ({children,title,description,keyword,author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8'></meta>
        <meta name='description' content={description}></meta>
        <meta name='keyword' content={keyword}></meta>
        <meta name='description' content={author}></meta>
        <title>{title}</title>
      </Helmet>
      <Header></Header>
      <main style={{minHeight:"75vh"}}>
       
      {children}
      </main>
      <Footer></Footer>
      </div>
  )
}
Layout.defaultProps={
  title:"Ecommerce app",
  description:"mern,react,node,mongodb",
  author:"Gopal Roy"
}

export default Layout;