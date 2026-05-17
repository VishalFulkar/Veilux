import axios from 'axios'

export async function fetchProducts(){
    const res = await axios.get("http://localhost:5000/api/products")
    return res.data;
}