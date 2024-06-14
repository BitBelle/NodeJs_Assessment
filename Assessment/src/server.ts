import express,{json} from 'express'
// import router from './Routes/productRoutes'
import productRoute from './Routes/productRoutes'

// import router from './Routes'
const app= express()

// middleware
app.use(json())

// routes
app.use("/product", productRoute)



app.listen(4000,()=>{
    console.log("Serverr Running...");
    
})

