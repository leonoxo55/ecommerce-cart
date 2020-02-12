import React, { useEffect } from "react";
import TopMenu from './components/TopMenu';
import useFecth from './hooks/useFetch';
import { URL_API_Products } from './utils/constants';
import Products from './components/Products';


function App() {

  const result = useFecth( URL_API_Products);


  return (
    <div >
      <TopMenu />
      <Products products={result} />
    </div>
  );
}

export default App;