//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const kebabCase = require('lodash.kebabcase');
const homeStartingContent = "Welcome to my blog.";
const aboutContent = "My name is Tushar Kushwaha.";
const contactContent = "Email : tkushwaha70@gmail.com";
const mongoose = require("mongoose");
const app = express();

const dotenv = require('dotenv');
dotenv.config();
var mongoUrl = process.env.urlxx;

mongoose.connect(mongoUrl,{useNewUrlParser: true, useUnifiedTopology: true});

const newPostSchema = {
  title: String,
  post: String
}

const Post = mongoose.model("post",newPostSchema);

const test = {
  title: "hellomf",
  post : "lorem"
}

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
 
app.get("/", (req,res)=>{
  Post.find({}, function(err, posts){

    res.render("home", {
 
      etext: homeStartingContent,
 
      epostArray: posts
 
      });
 
  })
});
app.get("/about", (req,res)=>{
  res.render("about", {
    etext: aboutContent
  });
})
app.get("/contact", (req,res)=>{
  res.render("contact", {
    etext: contactContent
  });
})
app.get("/compose", (req,res)=>{
  res.render("compose");
})
app.post("/compose", (req,res)=>{
  let newPost = new Post ({
    title: req.body.title,
    post: req.body.post
  });
  newPost.save(function(err){

    if (!err){
 
      res.redirect("/");
 
    }
 
  });
})
app.get("/posts/:anything", (req,res)=>{
const postId = req.params.anything;
  Post.findOne({_id: postId}, (err, post)=>{
    if(!err){
      res.render("post",{title: post.title,post: post.post});
    }
    else{
      console.log(err);
    }
  })
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
