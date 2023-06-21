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

  
app.post('/login/customers', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM accounts WHERE username = ? AND password = ? AND role = ?';
    db.query(query, [username, password], (err, results) => {
      if (err) { 
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      if (results.length === 0) { 
        res.status(401).json({ error: 'Invalid username or password' });
      } else {

        const user = results[0];
        res.json({
          id: user.id,
          username: user.username,
          role: user.role 
        });
        return res.render('admin/index', { msg: "Login Successfully", err: "" });
      }
    });
  });

app.post('/login/employees', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM accounts WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
      if (err) { 
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      if (results.length === 0) { 
        res.status(401).json({ error: 'Invalid username or password' });
      } else {

        const user = results[0];
        const role = user.role;
        return res.render('admin/index', { msg: "Login Successfully", err: "" , data: role });
      }
    });
  });

app.listen(port, ()=>{
    console.log("Connected! Listening on localhost port %d.", port)
})
