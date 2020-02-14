import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import TopMenu from './components/TopMenu';
import Products from './components/Products';
import useFecth from './hooks/useFetch';
import { URL_API_Products, LOCALSTORAGE } from './utils/constants';

function App() {

  const products = useFecth( URL_API_Products);
  const [productsCart, setProductsCart] = useState([]);

  useEffect(() => {
    getProductsCart();
  },[]);

  const getProductsCart = () => {
    const idProducts = localStorage.getItem(LOCALSTORAGE.PRODUCTS_CART);

    if(idProducts){
      const idsProductsSplit = idProducts.split(',');
      setProductsCart(idsProductsSplit);
    }else{
      setProductsCart([]);
    }

    
  }

  const addProductCart = (id, name) => {
      const idsProducts = productsCart;
      idsProducts.push(id);
      setProductsCart(idsProducts);
      localStorage.setItem(LOCALSTORAGE.PRODUCTS_CART, idsProducts);
      getProductsCart()

      toast.success(`${name} añadido al carrito correctamente`);
  }

  return (
    <div >
      <TopMenu products={products} getProductsCart={getProductsCart} productsCart={productsCart} />
      <Products products={products} addProductCart={addProductCart} />
      <ToastContainer position='bottom-left' autoClose={5000} hideProgressBar newestOnTop closeOnClick={false} rtl={false} pauseOnVisibilityChange={false} draggable pauseOnHover={false} />
    </div>
  );
}

export default App;