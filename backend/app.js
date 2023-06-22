const express = require('express')
const db = require('./db/db')
const fs = require('fs');
const { route } = require('./routes/route');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./utils/swagger/swagger.config');
const swaggerJSDoc = require('swagger-jsdoc');


const port = 8800
const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerDocs)));

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


app.use('/backend-api', route);

app.listen(port, ()=>{
  console.log("Connected! Listening on localhost port %d.", port)
})