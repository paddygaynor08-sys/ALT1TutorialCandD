console.log("Server log - start again"); 

var express = require('express'); 

var bodyParser = require('body-parser'); 

var app = express(); 

// Not sure that the next 3 lines are actually needed 

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(bodyParser.json()); // for parsing application/json 

app.use(express.static('public')); 

  

  

//from chatgpt on 2/10/2025 so that can see what's stored in SQLite d/b on render server. 

// Debug route: show all data in your table 

app.get("/show-data", (req, res) => { 

  db.all("SELECT * FROM homework", [], (err, rows) => { 

    if (err) { 

      console.error("DB error:", err.message); 

      res.status(500).send("Database error"); 

      return; 

    } 

    res.json(rows); // Send back all rows as JSON 

  }); 

}); 
