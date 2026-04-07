import axios from 'axios'

export async function fetchProducts(){
    const res = await axios.get("https://fakestoreapi.com/products")
    return res.data;
}