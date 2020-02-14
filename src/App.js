import React, { useState, useEffect } from "react";
import TopMenu from './components/TopMenu';
import useFecth from './hooks/useFetch';
import { URL_API_Products, LOCALSTORAGE } from './utils/constants';
import Products from './components/Products';
import { ToastContainer, toast } from 'react-toastify';


function App() {

  const result = useFecth( URL_API_Products);
  const [productCart, setProductCart] = useState([]);

  useEffect(() => {
    getProductsCart();
  },[]);

  const getProductsCart = () => {
    const idProducts = localStorage.getItem(LOCALSTORAGE.PRODUCTS_CART);

    if(idProducts){
      const idsProductsSplit = idProducts.split(',');
      setProductCart(idsProductsSplit);
    }else{
      setProductCart([]);
    }
  }

  const addProductCart = (id, name) => {
      const idsProducts = productCart;
      idsProducts.push(id);
      setProductCart(idsProducts);
      localStorage.setItem(LOCALSTORAGE.PRODUCTS_CART, idsProducts);
      getProductsCart()

      toast.success(`${name} añadido al carrito correctamente`);
  }


  return (
    <div >
      <TopMenu productCart={productCart} />
      <Products products={result} addProductCart={addProductCart} />
      <ToastContainer position='bottom-left' autoClose={5000} hideProgressBar newestOnTop closeOnClick={false} rtl={false} pauseOnVisibilityChange={false} draggable pauseOnHover={false} />
    </div>
  );
}

export default App;