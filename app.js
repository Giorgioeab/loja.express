const express = require('express')
const axios = require('axios')
const ejs = require('ejs')

const app = express()

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    try{
        // conexão com API
        const response = await axios.get('https://fakestoreapi.com/products')
        const products = response.data

    res.render ('products', { products })
    }    

    catch (error) {
        console.log(error)
    }
})

app.get ('/eletronicos', async (req, res) => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products/category/electronics')
        const prod_eletronicos = response.data
        res.render ('prod_eletronicos', { prod_eletronicos} )
    }
    catch (error){
        console.log(error)
    }
}) 

app.get ('/joias', async (req, res) => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products/category/jewelery')
        const prod_joias = response.data
        res.render ('prod_joias', { prod_joias} )
    }
    catch (error){
        console.log(error)
    }
}) 

app.get ('/vestuario', async (req, res) => {
    try {
        const response_homem = await axios.get("https://fakestoreapi.com/products/category/men's clothing")
        const response_mulher = await axios.get("https://fakestoreapi.com/products/category/women's clothing")

        const prod_homem = response_homem.data
        const prod_mulher = response_mulher.data
        const vestuario = await [...prod_homem, ...prod_mulher]

        res.render ('vestuario',  {vestuario} )
    }
    catch (error){
        console.log(error)
    }
}) 



app.listen (3000, () =>{
    console.log('Server ON')
})  

