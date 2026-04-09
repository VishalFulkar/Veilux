import axios from 'axios'

export async function fetchProducts(){
    const res = await axios.get("https://69d7f6619c5ebb0918c8a3d0.mockapi.io/products")
    return res.data;
}