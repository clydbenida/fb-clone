import axios from 'axios'

const config = {
   baseURL: "http://127.0.0.1:5000/",
   timeout: 5000,
}
export default axios.create(config)