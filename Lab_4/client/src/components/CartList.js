import React, {useContext} from "react"
import paint from "../images/paint.jpg"
import {useMessage} from "../hooks/message.hook"
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {useNavigate, useParams} from "react-router-dom"

export const CartList = ({carts}) => {
    const message = useMessage()
    const {request} = useHttp()
    const {token} = useContext(AuthContext)
    const navigate = useNavigate()
    //const cartId = useParams().id
    if(carts === undefined || !carts.length){
        return <p className="txt2">Ваша корзина пока пустая((</p>
    }
    let totalPrice = 0
    carts.forEach(element => {
        totalPrice += element.product_price * element.product_quantity
    })
    const deleteHandler = async () => {
        try{
            //event.preventDefault()
            const data = await request(`/api/cart/delete/`,'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(data)
            message(data.message)
            window.location.reload()
        }catch (e) {}
    }
    const deleteHandler2 = async (id) => {
        try{
            //event.preventDefault()
            const data = await request(`/api/cart/delete/${id}`,'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(data)
            message(data.message)
            window.location.reload()
        }catch (e) {}
    }
    const orderHandler = async () => {
        try{
            const data = await request(`/api/order/success`, 'POST', null, {
                Authorization: `Bearer ${token}`
            })
            message(data.message)
            navigate("/order", {replace: true})
            window.location.reload()
        }catch (e) {}
    }
    return(
        <div>
            <div className="cart">

                { carts.map((cart, index) => {
                    return(
                        <div className="_cart-main" >
                            <div className="_cart" key={cart._id}>
                                <p className="bot-dot1" />
                                <h2 className="ref1">{cart.product_title}</h2>
                                <div className="product-img"><a href="#"><img src={paint} height="70" width="70"
                                                                              alt="" /></a></div>
                                <p className="pri">{cart.product_price} <span>руб</span><button
                                    onClick={() => deleteHandler2(cart._id)} className="button1">Удалить товар</button></p>
                                <div className="tit">Количество: {cart.product_quantity} шт.</div>

                            </div>
                            <p className="bot-dot1" />
                        </div>
                    )
                })}
            </div>

            <div className="total">Итого: {totalPrice}</div>
            <div className="su"><button onClick={deleteHandler} className="button">Очистить корзину</button></div>
            <div className="su" onClick={orderHandler}><button className="buttonOrder">Оформить заказ</button></div>
            <a href="/home" class="home">Вернуться на главную</a>
        </div>
    )
}