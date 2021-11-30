import React, {useContext} from "react"
import paint from "../images/paint.jpg"
import {AuthContext} from "../context/AuthContext"
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"

export const OrderList = ({orders}) => {
    const {token} = useContext(AuthContext)
    const message = useMessage()
    const {request} = useHttp()
    if(orders === undefined || !orders.length){
        return <p className="txt2">Ваш заказ пока пустой((</p>
    }
    const deleteOrder = async (id) => {
        try{
            //event.preventDefault()
            const data = await request(`/api/order/delete/${id}`,'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(data)
            message(data.message)
            window.location.reload()
        }catch (e) {}
    }
    return(
        <>
            { orders.map((order) => {
                return (
                    <>
                        <div className="cart">
                        { order._carts.map((cart) => {
                            return(
                                <div className="_cart-main_" >
                                    <div className="_cart" key={cart._id}>
                                        <p className="bot-dot1"/>
                                        <h2 className="ref1">{cart.product_title}</h2>
                                        <div className="product-img"><a href="#"><img src={paint} height="70" width="70"
                                                                                      alt=""/></a></div>
                                        <p className="priOr">{cart.product_price} <span>руб</span></p>
                                        <div className="tit">Количество: {cart.product_quantity} шт.</div>

                                    </div>
                                    <p className="bot-dot1"/>
                                </div>
                            )
                        })}

                        </div>
                        <div className="total">Итого: {order.total}</div>
                        <div className="su">
                            <button className="button2" onClick={() => deleteOrder(order._id)}>Удалить заказ</button>
                        </div>
                    </>
                )
            })}
            <a href="/home" className="home">Вернуться на главную</a>
        </>
    )
}