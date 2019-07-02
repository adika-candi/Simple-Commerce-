import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import axios from 'axios';

class ProductItem extends Component {

    state={
        qty:0
    }

    onAddtoCart=(name,price,src)=>{
        //const qty=this.qty.value
        console.log("press")
        console.log(name)
        axios.get("http://localhost:2019/cart",
        {
            params:{
                userId:this.props.user.id,
                prd_name:name
            }
        }).then(res=>{
            console.log(res.data)
            if(res.data.length>0){
                axios.patch("http://localhost:2019/cart/"+res.data[0].id,{
                        prd_qty:res.data[0].prd_qty + parseInt( this.qty.value)
                    }).then(res=>{
                        console.log(res.data)
                    })
            }
            else{
                axios.post("http://localhost:2019/cart",{
                    userId:this.props.user.id,
                    prd_name:name,
                    prd_price:price,
                    prd_img:src,
                    prd_qty:parseInt( this.qty.value)
                }).then(res=>{
                    console.log(res.data)
                })
            }
        })
        
    }

    render(){

        var {id,name, price, src} = this.props.products // {id, name, desc, price, src}

        return (
            <div className="card col-3 m-5">
                <img src={src} className='card-img-top'/>
                <div className='card-body'>
                    <h5 className='card-title'>{name}</h5>
                    {/* <p className='card-text'>{desc}</p> */}
                    <p className='card-text'>Rp. {price}</p>
                    <input type='number' className='form-control' ref={(input)=>{this.qty=input}}/>
                    <Link to={"detailproduct/"+ id}>
                    <button className='btn btn-outline-primary btn-block'>Details</button>
                    </Link>
                    <button onClick={()=>{this.onAddtoCart(name,price,src)}} className='btn btn-primary btn-block'>Add To Cart</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth // {id, username}
    }
}

export default connect(mapStateToProps)(ProductItem)