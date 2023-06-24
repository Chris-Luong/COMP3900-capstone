const express = require('express')
const db = require('./db/db')
const fs = require('fs');  
const loginRoute = require('./routes/auth.route'); 

const port = 8800
const app = express()
app.use(express.json()) 

require('./swagger-setup')(app);

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


app.use('/', loginRoute);

app.listen(port, ()=>{
  console.log("Connected! Listening on localhost port %d.", port)
})