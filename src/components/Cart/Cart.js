import React, { Fragment, useState, useEffect } from 'react';
import {Button} from 'react-bootstrap';
import {ReactComponent as CartEmpty} from '../../assets/svg/cart-empty.svg';
import {ReactComponent as CartFull} from '../../assets/svg/cart-full.svg';
import {ReactComponent as Close} from '../../assets/svg/close.svg';
import {ReactComponent as Garbage} from '../../assets/svg/garbage.svg'
import { LOCALSTORAGE, BASE_PATH } from '../../utils/constants';
import { countDuplicateItemsArray, removeArrayDuplicates, removeItemArray} from '../../utils/arrayFunctions';

import './Cart.scss';

export default function Cart(props){

    const {productsCart, getProductsCart, products} = props;

    const [cartOpen, setCartOpen] = useState(false);
    const widthCartContent = cartOpen ? 400 : 0;
    const [singleProductsCart, setSingleProductsCart] = useState([]);

    useEffect(() => {
        const allProductsId = removeArrayDuplicates(productsCart);
        setSingleProductsCart(allProductsId);
    },[productsCart]);

    const openCart = () => {
        setCartOpen(true);
        document.body.style.overflow = 'hidden';
    }

    const closeCart = () => {
        setCartOpen(false);
        document.body.style.overflow = 'scroll';
    }

    const emptyCart = () => {
        localStorage.removeItem(LOCALSTORAGE.PRODUCTS_CART);
        getProductsCart();
    }

    return (
        <Fragment>
            <Button variant='link' className='cart' >
                {productsCart && productsCart.length > 0 ? (
                    <CartFull onClick={openCart} />
                ) : (
                    <CartEmpty onClick={openCart} />
                )}
                
            </Button>
            <div className='cart-content' style={{width: widthCartContent}}>
                <CartContentHeader closeCart={closeCart} emptyCart={emptyCart} />
                <div className='cart-content__products'>
                    {singleProductsCart.map((idProductCart, index) => (
                        <CartContentProducts key={index} products={products} idsProductsCart={productsCart} idProductCart={idProductCart} />
                    ))}
                </div>
            </div>
        </Fragment>
    );
}

function CartContentHeader(props) {
    const {closeCart, emptyCart} = props;

    return(
        <div className='cart-content__header' >
            <div>
                <Close onClick={closeCart} />
                <h2>Carrito</h2>
            </div>

            <Button onClick={emptyCart} variant='link' >
                Vaciar
                <Garbage />
            </Button>
        </div>
    )
}

function CartContentProducts(props){
    const { products: {loading, result}, idsProductsCart, idProductCart } = props;
    console.log(result);
    console.log(idProductCart);
    
    if(!loading && result) {
        return result.map((product, index) => {
            if(idProductCart == product.id){
                const quantity = countDuplicateItemsArray(product.id, idsProductsCart);
                return (
                    <RenderProduct key={index} product={product} quantity={quantity} />
                )
            }
        });
    }
    return null
}

function RenderProduct(props){
    const { product, quantity } = props;
    
    return(
        <div className='cart-content__product'>
            <img src={`${BASE_PATH}/${product.image}`} alt={product.name} />
            <div className='cart-content__product-info'>
                <div>
                    <h3>{product.name.substr(0, 25)}</h3>
                    <p>{product.price} CLP/ UD. </p>
                </div>
                <div>
                    <p>En carro: {quantity} ud.</p>
                    <div>
                        <button>+</button>
                        <button>-</button>
                    </div>
                </div>
            </div>
        </div>
    )
}