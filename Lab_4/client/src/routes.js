import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import {HomePage} from "./pages/HomePage"
import {ProductsPage} from "./pages/ProductsPage"
import {AddProduct} from "./pages/AddProduct"
import {UpdatePage} from "./pages/UpdatePage"
import {AboutPage} from "./pages/AboutPage"
import {CatalogPage} from "./pages/CatalogPage"
import {CartPage} from "./pages/CartPage"
import {OrderPage} from "./pages/OrderPage"

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return(
            <Routes>
                <Route path='/home' element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/products' element={<ProductsPage />} />
                <Route path='/products/add' element={<AddProduct />} />
                <Route path='/products/:id' element={<UpdatePage />} />
                <Route path='/products/delete/:id' element={<Navigate to ="/products" />} />
                <Route path='/catalog' element={<CatalogPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/order' element={<OrderPage />} />
                <Route path="*" element={<Navigate to ="/home" /> } />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path="/" element={<AuthPage /> } />
            <Route path="*" element={<Navigate to ="/" />}/>
        </Routes>)
}