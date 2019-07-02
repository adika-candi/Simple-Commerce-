import React,{Component} from "react"
import axios from "axios"

class DetailProduct extends Component{

    state={
        productsDetail:[]
    }

    componentDidMount(){
        let pro_id=this.props.match.params.product_id
        axios.get(
            "http://localhost:2019/products/"+pro_id
        ).then(res=>{
            this.setState({productsDetail:res.data})
        })
    }

    render(){
        var {name, desc,price, src} = this.state.productsDetail
        return (
            <div className="card col-3 m-5">
                <img src={src} className='card-img-top'/>
                <div className='card-body'>
                    <h5 className='card-title'>{name}</h5>
                    <p className='card-text'>{desc}</p>
                    <p className='card-text'>Rp. {price}</p>
                    <input type='text' className='form-control'/>
                    <button className='btn btn-primary btn-block'>Add To Cart</button>
                </div>
            </div>
        )
    }
}

export default DetailProduct