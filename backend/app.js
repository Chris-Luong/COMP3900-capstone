const express = require('express')
const db = require('./db/db')
const fs = require('fs');
const { login } = require('./controller/login');

const port = 8800
const app = express()
app.use(express.json())

const init_db = fs.readFileSync('init_db.sql', 'utf8');

// Execute the SQL statements
db.query(init_db, (err, results) => {
  if (err) {
    console.error('Error executing SQL file:', err);
    return;
  }
  console.log('DB Init Success');
});
 

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

// middleware for role-based authorization
function authorize(role) {
    return function(req, res, next) {

      if (req.user.role === role) {
        // User has the required role
        next(); 
      } else {
        res.status(403).json({ message: 'Access denied. You do not have the permission' });
      }
    };
  }

  
app.post('/login', login);