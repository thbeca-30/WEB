import React, {useCallback, useContext, useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {useMessage} from "../hooks/message.hook"
import {useHttp} from "../hooks/http.hook"
import {Loader} from "../components/Loader"
import {AuthContext} from "../context/AuthContext"


export const UpdatePage = () => {
    //const {token} = useContext(AuthContext)
    const message = useMessage()
    const navigate = useNavigate()
    const {loading, request} = useHttp()
    const [product, setProduct] = useState({
        title: '', description: '', price: '', quantity: ''
    })
    const productId = useParams().id
    const getProduct = useCallback(async () => {
        try{
            const fetched = await request(`/api/products/${productId}`, 'GET', null, {
                //Authorization: `Bearer ${token}`
            })
            setProduct(fetched)
        }catch(e){}
    }, [/*token*/, productId, request])
    const changeHanlder = event => {
        setProduct({...product, [event.target.name]: event.target.value})
    }
    const productHandler = async () => {
        try{
            const data = await request(`/api/products/edit/${product._id}`, 'POST', {...product})
            message(data.message)
            navigate("/products", {replace: true})
        }catch (e) {}
    }
    useEffect(() => {
        getProduct()
        //console.log(productId)
    }, [getProduct])
    if(loading){
        return <Loader />
    }

    return(
        <div>
            <div className="ts">
                <label className="txt2">Название</label><br/><br/>
                <input name="title" className="vvod"
                       id="title" type="text" value={product.title} onChange={changeHanlder} /><br/><br/>
                <label className="txt2">Описание</label><br/><br/>
                <input name="description" className="vvod"
                       id="description" type="text" value={product.description} onChange={changeHanlder} /><br/><br/>
                <label className="txt2">Цена</label><br/><br/>
                <input name="price" className="vvod"
                       id="price" type="number" value={product.price} onChange={changeHanlder} /><br/><br/>
                <label className="txt2">Количество</label><br/><br/>
                <input name="quantity" className="vvod"
                       id="quantity" type="number" value={product.quantity} onChange={changeHanlder} /><br/><br/>
            </div>
            <div className="sub"><input type="submit" value="Отправить" className="submit" onClick={productHandler}
                                        disabled={loading}/></div>
            <a href="/products" className="home">К списку товаров</a>
        </div>
    )
}