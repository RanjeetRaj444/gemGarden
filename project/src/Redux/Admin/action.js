import axios from "axios"
import { ADMIN_GET_REQUEST, ADMIN_LOGIN_FAILURE, ADMIN_LOGIN_SUCCESS } from "./actionTypes"


export const getAdminlogin = () => (dispatch) => {
    dispatch({type:ADMIN_GET_REQUEST})
     axios.get(`https://gem-garden-backenddata.onrender.com/adminlogindata`).then((res)=>{
      dispatch({type:ADMIN_LOGIN_SUCCESS, payload : res.data})
    }).catch((err)=>{
      console.log(err)
      dispatch({type:ADMIN_LOGIN_FAILURE, payload:err.message})
     })
  }