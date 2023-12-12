const express = require('express')
const app = express()

// const myLogger = function (req, res, next) {
//     console.log(req.query)
//   if(req.query.password=='123')
//   {
//     console.log("welcome");
//     next()
//   }
//   else{
//     res.sendStatus(401);
//   }

// }
//app.use(myLogger);
// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

//2...................
// 
//3...................
// app.use((req, res, next) => {
//     console.log('Time:', Date.now())
//     next()
//   })

// app.use('/', (req, res, next) => {
//     console.log('Request URL:', req.originalUrl)
//     next()
//   }, (req, res, next) => {
//     console.log('Request Type:', req.method)
//     next()
//   });

//   app.get('/',(req,res,next)=>{
//    res.sendStatus(200)
//    next();
//   });
// app.get('/', (req, res, next) => {
//     res.send(req.params.id)
//   });

//4........................array of middleware

function logOriginalUrl (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
  }
  
  function logMethod (req, res, next) {
    console.log('Request Type:', req.method)
    next()
  }
  
  const logStuff = [logOriginalUrl, logMethod]
  app.get('/', logStuff, (req, res, next) => {
    res.send('User Info')
  })
    
   

app.listen(3000)