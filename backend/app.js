import express from "express"
import mysql from "mysql"


const port = 8800
const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"queuequicker"
})

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

app.listen(port, ()=>{
    console.log("Connected! Listening on localhost port %d.", port)
})
