//importing express module
const express= require("express")
//creating server similar to http.createServer()
const app=express();

//middleware function with no mount path. The function is executed every time the app receives a request.
app.use((req,res,next)=>{
    console.log("Middleware 1 is called")
    next()
})

app.use((req,res,next)=>{
    console.log("Middleware 2 is called")
    next()
})


//middleware function mounted on the /user/:id path. The function is executed for any type of HTTP request on the /user/:id path.
app.use("/users/:id",(req,res,next)=>{
    console.log("Request Method",req.method)
    res.send("get method")
})

//route and its handler function (middleware system). The function handles GET requests to the /user/:id path.
app.get("/user/",(req,res,next)=>{
    console.log("Router for get mEthod ")
})


//middleware substack
app.use('/user/:id', function (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
  }, function (req, res, next) {
    console.log('Request Type:', req.method)
    res.end()
  })

//using next(route) to  skip the rest of the middleware functions from a router middleware stack
app.get('/post/:id', function (req, res, next) {
    // if the user ID is 0, skip to the next route
    if (req.params.id === '0'){
        next('route')
    }
    // otherwise pass the control to the next middleware function in this stack
    else next()
  }, function (req, res, next) {
    // send a regular response
    res.send('regular')
  })
  
  app.get('/post/:id', function (req, res, next) {
    res.send('special')
  })
  

//running in port 3001
app.listen(3001,()=>{console.log("server running in port 3001")})