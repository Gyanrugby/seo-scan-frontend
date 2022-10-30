import axios from 'axios'
const SetauthToken = token => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    }else{
        delete axios.defaults.headers.common['x-auth-token']
        delete axios.defaults.headers.common['Content-Type']
        delete axios.defaults.headers.common['Access-Control-Allow-Origin']
    }
}
export default SetauthToken