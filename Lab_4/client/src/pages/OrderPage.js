import React, {useCallback, useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {Loader} from "../components/Loader"
import paint from "../images/paint.jpg";
import {CartList} from "../components/CartList";
import {OrderList} from "../components/OrderList";

export const OrderPage = () => {
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [orders, setOrders] = useState({
        _carts: [{
            product_id: '',
            product_title: '',
            product_price: '',
            product_quantity: ''
        }],
        total: ''
    })

    const getOrders = useCallback(async () => {
        try{
            const fetched = await request(`/api/order`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setOrders(fetched)
        }catch(e){}
    }, [token, request])
    useEffect(() => {
        getOrders()
        //console.log(productId)
    }, [getOrders])
    if(loading){
        return <Loader />
    }
    return(
        <>
            {!loading && <OrderList orders={orders}/>}
        </>

    )
}