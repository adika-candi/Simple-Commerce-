import axios from "axios"
import cookies from "universal-cookie"

const cookie = new cookies()

export const onLoginUSer=(user,pass)=>{
    return (dispatch)=>{
        axios.get("http://localhost:2019/users",
        {
            params:{
                username:user,
                password:pass
            }
        }).then(res=>{
            console.log(res)
            if(res.data.length>0){
                const {id, username} = res.data[0]
                dispatch(
                    {
                        type:"LOGIN_SUCCESS",
                        payload:{
                            id,username
                        }
                    }
                )
                cookie.set("userName",{id,username}, {path:"/"})
            }
            else{
                console.log("login gagal")
                    }
                })
    }
}

// export const addToCart=(user,product)=>{
//     return{
//         type:"ADD_TO_CART",
//         payload:{
//             user_id:user,
//             product_id:product
//         }
//     }
// }

export const keepLogin=(objUser)=>{
    return {
        type: "LOGIN_SUCCESS",
        payload: {
            id: objUser.id,
            username : objUser.username
        }
}
}

export const OnLogOut=()=>{
    console.log("remove")
    cookie.remove("userName")
    return {
        type:"LOGOUT_SUCCESS"
    }
}