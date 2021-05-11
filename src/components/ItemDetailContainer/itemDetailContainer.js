import { useState, useEffect } from "react";
import { ItemDetail } from "../ItemDetail/itemDetail"
import { productsGroup } from "../ProductsGroup/productsGroup";
import { useParams, } from 'react-router'
import { useContext } from "react";
import { CartContext } from '../../context/cartContext'
export const ItemDetailContainer = () => {

    const { productId } = useParams();
    const [ product, setProduct ] = useState({})
    const { addToCart } = useContext(CartContext);
    const { removeFromCart } = useContext(CartContext);

    const getProducts = new Promise((res, rej) => {
        setTimeout(function () {
            res(productsGroup);
        }, 2000);
    });

    useEffect(() => {
        getProducts
            .then((res) => {
                res.forEach((item) => {
                    if (item.title === productId) {
                        setProduct(item);
                    }
                });
            })
            .catch((err) => alert(err))
    }, []);

    return (
        <ItemDetail  
        title={product.title}
        price={product.price}
        image={product.image}
        onAdd={() => addToCart(product)}
        onDelete={() => removeFromCart(product)}
        />
    )
}
