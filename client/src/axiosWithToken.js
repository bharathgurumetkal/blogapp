import axios from "axios";
//get token from localStorage
const token=localStorage.getItem('token')
export const axiosWithToken=axios.create({
    headers:{Authorization:`Bearer ${token}`}
})