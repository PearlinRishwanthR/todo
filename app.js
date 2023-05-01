
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("Public"));

//placeholders for added task
let newItems=[];
//placeholders for removed task
var complete = [];

//post route for adding new task 
app.post("/", function(req, res) {
    var newItem = req.body.listTodo;
    //add the new task from the post route
    newItems.push(newItem);
    res.redirect("/");
});

app.post("/remove", function(req, res) {
    var completeTask = req.body.check;
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        newItems.splice(newItems.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            newItems.splice(newItems.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/"); 
});

app.post("/removeall",(req,res)=>{
    complete=[];
    res.redirect("/");
});

//render the ejs and display added task, completed task
app.get("/", function(req, res) {
    let option = {
        weekday:'long', 
        year:'numeric', 
        month:'long', 
        day:'numeric'
    }
    let today = new Date();
    let day = today.toLocaleDateString("en-US",option);
    res.render("list", {kindOfday:day ,item: newItems, complete: complete });
});

//set app to listen on port 3000
app.listen(3000, function() {
    console.log("server is running on port 3000");
});