import React, { Fragment, useState } from 'react';
import {Button} from 'react-bootstrap';
import {ReactComponent as CartEmpty} from '../../assets/svg/cart-empty.svg';
import {ReactComponent as CartFull} from '../../assets/svg/cart-full.svg';
import {ReactComponent as Close} from '../../assets/svg/close.svg';
import {ReactComponent as Garbage} from '../../assets/svg/garbage.svg'
import { LOCALSTORAGE } from '../../utils/constants';

import './Cart.scss';

export default function Cart(props){

    const {productCart, getProductsCart} = props;

    const [cartOpen, setCartOpen] = useState(false);
    const widthCartContent = cartOpen ? 400 : 0; 

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
                {productCart && productCart.length > 0 ? (
                    <CartFull onClick={openCart} />
                ) : (
                    <CartEmpty onClick={openCart} />
                )}
                
            </Button>
            <div className='cart-content' style={{width: widthCartContent}}>
                <CartContentHeader closeCart={closeCart} emptyCart={emptyCart} />
                Todos mis productos
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