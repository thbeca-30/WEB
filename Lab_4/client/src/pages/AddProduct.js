import React, {useState, useEffect} from "react"
import {useMessage} from "../hooks/message.hook"
import {useHttp} from "../hooks/http.hook"
import {useNavigate} from "react-router-dom"

export const AddProduct = () => {
    const navigate = useNavigate()
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [product, setProduct] = useState({
        title: '', description: '', price: 0, quantity: 0
    })
    useEffect(() =>{
        message(error)
        clearError()
    }, [error, message, clearError])
    const changeHanlder = event => {
        setProduct({...product, [event.target.name]: event.target.value})
    }
    const productHandler = async () => {
        try{
            const data = await request('/api/products/add', 'POST', {...product})
            message(data.message)
            navigate("/products", {replace: true})
        }catch (e) {}
    }
    return(
        <div>
            <div className="ts">
                <label className="txt2">Название</label><br/><br/>
                <input name="title" className="vvod" placeholder="Введите название"
                       id="title" type="text" value={product.title} onChange={changeHanlder}/><br/><br/>
                <label className="txt2">Описание</label><br/><br/>
                <input name="description" className="vvod" placeholder="Введите описние"
                       id="description" type="text" value={product.description} onChange={changeHanlder}/><br/><br/>
                <label className="txt2">Цена</label><br/><br/>
                <input name="price" className="vvod" placeholder="Введите цену"
                       id="price" type="number" value={product.price} onChange={changeHanlder}/><br/><br/>
                <label className="txt2">Количество</label><br/><br/>
                <input name="quantity" className="vvod" placeholder="Введите количество"
                       id="quantity" type="number" value={product.quantity} onChange={changeHanlder}/><br/><br/>
            </div>
            <div className="sub"><input type="submit" value="Отправить" className="submit" onClick={productHandler}
                                        disabled={loading}/></div>
            <a href="/products" className="home">К списку товаров</a>
        </div>
    )
}