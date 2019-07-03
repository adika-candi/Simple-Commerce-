import React,{Component} from "react"
import { Link } from 'react-router-dom'
import {connect} from "react-redux"
import axios from "axios"

class Cart extends Component{

    state = {
        subTotal:0,
        //stateQuantity:0,
        checkOutCartPrd:[],
        cart_prd:[],
        selectedId:0,
        checkOutState:0
    }

    componentDidMount(){
        // Akses database
        this.setState({checkOutState:0})
        this.getCartPrd()
    }

    getCartPrd=()=>{
        axios.get('http://localhost:2019/cart')
            .then(res => {
                var arrCart=res.data.filter(item=>
                    item.userId===this.props.user.id
                )
                this.setState({cart_prd:arrCart})

                var tempTotal=0

                for(var i=0;i<arrCart.length;i++){
                    tempTotal=tempTotal+(arrCart[i].prd_qty*arrCart[i].prd_price)
                }
                this.setState({subTotal:tempTotal})
            })
    }
    addQty=(id,tempQty)=>{
        axios.patch("http://localhost:2019/cart/"+id,
        {
            prd_qty:tempQty+1
        }).then(res=>{
            console.log('hai')
            this.getCartPrd()
        })
    }
    reduceQty=(id,tempQty)=>{
        console.log(tempQty)
        if(tempQty!==1){
            axios.patch("http://localhost:2019/cart/"+id,
            {
                prd_qty:tempQty-1
            }).then(res=>{
                console.log('hai')
                this.getCartPrd()
            })
        }
        else{
            
        }
        
    }
    removePrd=(id)=>{
        axios.delete("http://localhost:2019/cart/"+id).then(this.getCartPrd())
    }

    onCheckOut=()=>{
        this.setState({checkOutCartPrd:this.state.cart_prd})
        var prdLength=0
        axios.get("http://localhost:2019/cart",
        {
            params:{
                userId:this.props.user.id
            }
        }).then(res=>{
            console.log(res.data)
            this.setState({checkOutState:1})
            this.getCartPrd()
            prdLength=res.data.length
            for(var i=0;i<prdLength;i++){
                axios.delete("http://localhost:2019/cart/"+res.data[i].id).then(console.log(i+" check out"))
            }
            
        })

        
    }

    renderList = () => {
        
            if(this.state.checkOutState===0){
                return this.state.cart_prd.map( item => { // {id, name, price, desc, src}
                    return (
                        <tr>
                            <td>{item.prd_name}</td>
                            <td>
                                <img className='list' src={item.prd_img}/>
                            </td>
                            <td>Rp.{String(item.prd_price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}</td>
                            <td>{item.prd_qty}</td>
                            <td>Rp.{String(item.prd_qty*item.prd_price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}</td>
                            <td>
                                <td>
                                    <button onClick={() => {this.addQty(item.id,item.prd_qty)}} className = 'btn btn-outline-primary mx-1'>+</button>
                                    <button onClick={()=>{this.reduceQty(item.id,item.prd_qty)}} className = 'btn btn-outline-primary mx-1'>-</button>
                                </td>
                                <td>
                                    <button onClick={()=>{this.removePrd(item.id)}} className = 'btn btn-danger'>Remove</button>
                                </td>
                            </td>
                        </tr>
                    )
                })
            }
            else{
                return this.state.checkOutCartPrd.map( item => { // {id, name, price, desc, src}
                    return (
                        <tr>
                            <td>{item.prd_name}</td>
                            <td>Rp.{String(item.prd_price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}</td>
                            <td>{item.prd_qty}</td>
                            <td>Rp.{String(item.prd_qty*item.prd_price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}</td>
                        </tr>
                    )
                    })        
            }
    }

    render(){
        if(this.state.checkOutState===0){
            return (
                <div className="container">
                    <h1 className="display-4 text-center">List Product</h1>
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">NAME</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">QUANTITY</th>
                                <th scope="col">TOTAL</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                    {/* <div className="center m-5"><h2>Total Belanjaan : Rp.{this.state.subTotal}</h2></div> */}
                    <div className="container">
                        <div className="row">
                            <div className="col"></div>
                            <div className="col">
                                <Link to="./">
                                <button className = 'btn btn-success mx-3'>Shop Again</button>
                                </Link>
                                <button onClick={this.onCheckOut} className = 'btn btn-primary'>CheckOut</button>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                    
                </div>
            )
        }
        else{
            return (
                <div className="container">
                    <h1 className="display-4 text-center">List Product</h1>
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">NAME</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">QUANTITY</th>
                                <th scope="col">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                    <div className="container m-3">
                        <div className="row">
                            <div className="col-8 text-center"><h2>Total Belanjaan : </h2></div>
                            <div className="col-4"><h2>Rp.{String(this.state.subTotal).replace(/(.)(?=(\d{3})+$)/g,'$1.')}</h2></div>
                        </div>
                    </div>
                    
                    <div className="container">
                        <div className="row">
                            <div className="col"></div>
                            <div className="col">
                                <Link to="./">
                                <button className = 'btn btn-success mx-3'>Shop Again</button>
                                </Link>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                    
                </div>
            )
        }

    }
}
const mapStateToProps = state => {
    return {
        user: state.auth // {id, username}
    }
}

export default connect(mapStateToProps)(Cart)