import React,{Component} from "react"
import axios from "axios"
import {Link} from "react-router-dom"

class Register extends Component{
    
    onButtonClick=()=>{
        const user=this.username.value
        const Email=this.email.value
        const pass=this.password.value
        
        axios.get("http://localhost:2019/users",
        {
            params:{
                username:user
            }
        }).then(res=>{
            if(res.data.length>0){
                console.log("username ditemukan")
            }
            else{
                axios.get("http://localhost:2019/users",
                {
                    params:{
                        email:Email
                    }
                }).then(res=>{
                    if(res.data.length>0){
                        console.log("email ditemukan")
                    }
                    else{
                        axios.post("http://localhost:2019/users",{
                            username:user,
                            email:Email,
                            password:pass
                         }
                        ).then((res)=>{
                            console.log("sukses")
                            console.log(res)
                        }).catch((err)=>{
                            console.log("gagal")
                            console.log(err)
                        })
                    }
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    render(){
        return(
            <div>
                <div className="mt-5 row">
                <div className="col-sm-3 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <div className="border-bottom border-secondary card-title">
                            <h1>Register Page</h1>
                            </div>
                            <div className="card-title">
                                <h4>Username</h4>
                            </div>
                            <form className="input-group">
                                <input className="form-control" type="text" ref={(input)=>{this.username=input}}
                                >
                                </input>
                            </form>
                            <div className="card-title">
                                <h4>Email</h4>
                            </div>
                            <form className="input-group">
                                <input className="form-control" type="text" ref={(input)=>{this.email=input}}
                                >
                                </input>
                            </form>
                            <div className="card-title">
                                <h4>Password</h4>
                            </div>
                            <form className="input-group">
                                <input className="form-control" type="password" ref={(input)=>{this.password=input}}></input>
                            </form>
                            <button onClick={this.onButtonClick} className="btn btn-success mt-3">Click to Register</button>
                            <p>Memiliki Akun?<Link to="/login">Klik disini</Link></p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }

}

export default Register