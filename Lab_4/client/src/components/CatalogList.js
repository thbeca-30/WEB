import React, {useCallback, useContext} from "react"
import paint from "../images/paint.jpg"
import basket from "../images/basket.jpg"
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"
import {AuthContext} from "../context/AuthContext"

export const CatalogList = ({products}) => {
    const message = useMessage()
    const {request} = useHttp()
    const {token} = useContext(AuthContext)
    if(products === undefined){
        return <p>Товаров пока нет</p>
    }
    const cartHandler = async (id) => {
        try{
            //event.preventDefault()
            const data = await request(`/api/cart/${id}`,'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(data)
            message(data.message)
            //window.location.reload()
        }catch (e) {}
    }
    return(
        <div>
            <div className="catalog">
                { products.map((product, index) => {
                   return(
                       <div className="product-main">
                           <div className="product" key={product._id}>
                               <h2 className="ref">{product.title}</h2>
                               <div className="product-img"><img src={paint} height="200" width="200" alt="" /></div>
                               <div className="tit">{product.description}</div>
                               <p className="price">{product.price} <span>руб</span><button onClick={() => cartHandler(product._id)} className="bas"><img
                                   src={basket}  height="28" width="28" alt="" /></button></p>


                           </div>
                           <p className="bot-dot" />
                       </div>
                   )
                })}

            </div>
            <a href="/home" className="home">Вернуться на главную</a>
        </div>
    )
}