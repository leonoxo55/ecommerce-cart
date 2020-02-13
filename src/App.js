import React, { useState } from "react";
import TopMenu from './components/TopMenu';
import useFecth from './hooks/useFetch';
import { URL_API_Products, LOCALSTORAGE } from './utils/constants';
import Products from './components/Products';


function App() {

  const result = useFecth( URL_API_Products);
  const [productCart, setProductCart] = useState([]);

  const addProductCart = (id, name) => {
      const idsProducts = productCart;
      idsProducts.push(id);
      setProductCart(idsProducts);
      localStorage.setItem(LOCALSTORAGE.PRODUCTS_CART, idsProducts);
  }


  return (
    <div >
      <TopMenu />
      <Products products={result} addProductCart={addProductCart} />
    </div>
  );
}

export default App;