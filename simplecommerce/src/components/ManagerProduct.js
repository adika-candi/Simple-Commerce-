import React, { Component } from 'react'
import {Redirect} from "react-router-dom"
import axios from 'axios'

import cookies from "universal-cookie"

const cookie=new cookies()

class ManagerProduct extends Component {
    state = {
        products: [],
        selectedId:0
    }

    componentDidMount(){
        // Akses database
        this.getProduct()
    }

    getProduct=()=>{
        axios.get('http://localhost:2019/products')
            .then(res => {
               this.setState({products: res.data,selectedId:0})
            })
    }

    onSaveItem=id=>{
        var nama=this.editName.value
        var desc=this.editDesc.value
        var price=this.editPrice.value

        axios.patch("http://localhost:2019/products/"+id,
        {
            name:nama,
            desc:desc,
            price:price
        }).then(res=>{
            console.log('hai')
            this.getProduct()
        })
    }

    onDeleteItem=(id)=>{
        axios.delete("http://localhost:2019/products/"+id).then(this.getProduct())
    }

    addProduct=()=>{
        const name=this.productName.value
        const desc=this.description.value
        const prc=parseInt( this.price.value)
        const imgLink=this.imageLink.value

        axios.post("http://localhost:2019/products",{
            name,
            desc,
            price:prc,
            src:imgLink
        }
        ).then(res=>{
                this.getProduct()
        }).catch((err)=>{
            console.log("gagal")
            console.log(err)
        })
    }

    renderList = () => {
        return this.state.products.map( item => { // {id, name, price, desc, src}
            if(item.id !== this.state.selectedId){
                return (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.desc}</td>
                        <td>{item.price}</td>
                        <td>
                            <img className='list' src={item.src}/>
                        </td>
                        <td>
                            <button onClick={() => {this.setState({selectedId: item.id})}} className = 'btn btn-primary'>Edit</button>
                            <button onClick={()=>{this.onDeleteItem(item.id)}} className = 'btn btn-warning'>Delete</button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr>
                        <td>{item.id}</td>
                        <td>
                            <input className="form-control" ref={input => {this.editName = input}} type="text" defaultValue={item.name}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editDesc = input}} type="text" defaultValue={item.desc}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editPrice = input}} type="text" defaultValue={item.price}/>
                        </td>
                        <td>
                            <img className='list' src={item.src}/>
                        </td>
                        <td>
                            <button onClick={()=>{this.onSaveItem(item.id)}} className = 'btn btn-primary'>Save</button>
                            <button onClick={()=> {this.setState({selectedId: 0})}} className = 'btn btn-warning'>Cancel</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    render () {
        if(cookie.get("userName")!==undefined){
            return (
                <div className="container">
                    <h1 className="display-4 text-center">List Product</h1>
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                    <h1 className="display-4 text-center">Input Product</h1>
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col"><input ref={input => this.productName = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.description = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.imageLink = input} className="form-control" type="text" /></th>
                                <th scope="col"><button className="btn btn-outline-warning" onClick={this.addProduct}>Add</button></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
        
        return <Redirect to="/login"></Redirect>
        
    }

}

export default ManagerProduct