import React,{Component} from "react"
import {Link,Redirect} from "react-router-dom"
import {connect} from "react-redux"
import cookies from "universal-cookie"

import {onLoginUSer} from "../actions/index.js"
 
//const cookie = new cookies()

class Login extends Component{

    onButtonClick=()=>{
        const user=this.username.value
        const pass=this.password.value

        this.props.onLoginUSer(user,pass)
            }

    render(){
        console.log(this.props.user.username)
        if(this.props.user === ''){
            return(
                <div>
                    <div className="mt-5 row">
                    <div className="col-sm-3 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <div className="border-bottom border-secondary card-title">
                                <h1>Login</h1>
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
                                    <h4>Password</h4>
                                </div>
                                <form className="input-group">
                                    <input className="form-control" type="password" ref={(input)=>{this.password=input}}></input>
                                </form>
                                <button onClick={this.onButtonClick} className="btn btn-success mt-3">Login</button>
                                <p>Tidak Memiliki Akun?<Link to="/register">Klik disini</Link></p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            )
        }
        return <Redirect to="/"/>
    }

}

const mapStateToProps=state=>{
    return{
        user:state.auth.username
    }
}

export default connect(mapStateToProps,{onLoginUSer})(Login)