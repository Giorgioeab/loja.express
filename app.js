const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', async (req, res) => {
    try{
        // conexão com API
        const response = await axios.get('https://fakestoreapi.com/products')
        const products = response.data

    res.render('products', { products })
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

let cart = []

app.post('/carrinho', async (req, res) => {
    const produto = await parseInt(req.body.comprado)
    
    const response = await axios.get(`https://fakestoreapi.com/products/${produto}`)
    const prodCart = response.data
    cart.push(prodCart)
    res.redirect('/carrinho')
})

app.get('/carrinho',(req, res) => {
    res.render('carrinho', {cart})
})

app.post('/remover', (req, res) => {
    const itemRemovido = parseInt(req.body.removido)
    const removidoIndex = cart.findIndex(item => item.id === itemRemovido)
    if (removidoIndex !== -1){
        cart.splice(removidoIndex, 1)
    }
    res.redirect('/carrinho')
})

app.listen (3000, () =>{
    console.log('Server ON')
})  

