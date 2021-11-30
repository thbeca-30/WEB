import React, {useEffect} from "react"
import {Navigate, useNavigate, useParams} from "react-router-dom"
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"

export const ProductsList = ({products}) => {
    const navigate = useNavigate()
    //const productId = useParams().id
    const {request, error, clearError} = useHttp()
    const message = useMessage()
    if(products === undefined){
        return <p>Товаров пока нет</p>
    }
    const deleteHandler = async (id) => {
        try{
            //event.preventDefault()
            const data = await request(`/api/products/delete/${id}`,'DELETE', null)
            console.log(data)
            message(data.message)
            window.location.reload()
        }catch (e) {}
    }

    return(
        <div>
            <a href="/products/add" className="home">Добавить товар</a>
            <table className="table">
                <tr>
                    <th className="txt1">Название</th>
                    <th className="txt1">Описание</th>
                    <th className="txt1">Цена</th>
                    <th className="txt1">Количетво</th>
                    <th className="txt1">Обновить</th>
                    <th className="txt1">Удалить</th>
                </tr>
                { products.map((product, index) => {
                    return(
                        <tr key={product._id}>
                            <td className="txt">{product.title}</td>
                            <td className="txt">{product.description}</td>
                            <td className="txt">{product.price}</td>
                            <td className="txt">{product.quantity}</td>
                            <td><a href= {'/products/'+ product._id} className="update">Update</a></td>
                            <td><button onClick={() => deleteHandler(product._id)} className="button">Delete</button></td>
                        </tr>
                    )
                })}
                    </table>
                    <a href="/home" className="home">Вернуться на главную</a>
        </div>
    )
}