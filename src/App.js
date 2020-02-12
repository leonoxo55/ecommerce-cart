import React, { useEffect } from "react";
import TopMenu from './components/TopMenu';
import useFecth from './hooks/useFetch';
import { URL_API_Products } from './utils/constants';


function App() {

  const result = useFecth( URL_API_Products);

  console.log(result);
  
  return (
    <div >
      <TopMenu />
    </div>
  );
}

export default App;