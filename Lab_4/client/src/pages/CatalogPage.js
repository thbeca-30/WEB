import React, {useCallback, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook"
import {Loader} from "../components/Loader"
import {CatalogList} from "../components/CatalogList"

export const CatalogPage = () => {
    const [products, setProducts] = useState()
    const {loading, request} = useHttp()
    //const {token} = useContext(AuthContext)
    const fetchProducts = useCallback(async () => {
        try{
            const fetched = await request('/api/products', 'GET', null, {
                //Authorization: `Bearer ${token}`
            })
            setProducts(fetched)
        }catch(e){}
    }, [/*token, */request])
    useEffect(() =>{
        fetchProducts()
    }, [fetchProducts])
    if(loading){
        return <Loader />
    }

    return(
        <>
            {!loading && <CatalogList products={products}/>}
        </>
    )
}