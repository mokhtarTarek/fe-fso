import axios from 'axios'
const baseUrl='/api/login'

const login = async credentials=>{
    //credentials are Object {username and password}
    //response should be token + user details
    const response = await axios.post(baseUrl, credentials)
    return response.data
}
const loginService={login: login}
export default loginService