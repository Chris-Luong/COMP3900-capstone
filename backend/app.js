const express = require('express')
const db = require('./db/db')

const authRoute = require('./routes/auth.route'); 

const port = 8800
const app = express()
app.use(express.json()) 

require('./swagger-setup')(app);

   

app.get("/", (req, res)=>{
    res.json("Backend working!")
})

app.get("/accounts", (req, res)=>{ 
    const q = "SELECT * FROM account"
    db.query(q, (err, data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})


app.use('/', authRoute);

app.listen(port, ()=>{
  console.log("Connected! Listening on localhost port %d.", port)
})