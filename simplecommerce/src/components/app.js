import React from "react"
import {Route,BrowserRouter} from "react-router-dom"
import Cookies from "universal-cookie"
import {connect} from "react-redux"

import Register from "./Register.js"
import Header from './Header'
import Login from "./Login.js"
import Home from "./Home.js"
import ManagerProduct from "./ManagerProduct.js"
import DetailProduct from "./DetailProduct.js"
import Cart from "./Cart.js"

import {keepLogin} from "../actions/index.js"

const cookie =new Cookies()

class App extends React.Component{

    componentDidMount(){
        const objCookie=cookie.get("userName")
        if(objCookie!==undefined){
            this.props.keepLogin(objCookie)
        }
    }

    render(){
        return(
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/Login" component={Login}></Route>
                    <Route path="/ManagerProduct" component={ManagerProduct}></Route>
                    <Route path="/cart" component={Cart}></Route>
                    <Route path="/detailproduct/:product_id" component={DetailProduct}></Route>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null,{keepLogin})(App)