const express = require('express');
const app = express();
const userModel = require('./userModel');
const path = require('path');

// Set the view engine to ejs
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render("index");
});

app.get('/read', async (req, res) => {
    const users = await userModel.find();
    res.render("read", {users: users});
});

app.post('/create', async (req, res) => {
    let { name, email, img } = req.body;
    const createdUser = await userModel.create({
        name,
        email,
        img,
    });
    res.redirect('/read');
});

app.get('/delete/:id', async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect('/read'); // Use '/read' to redirect to the correct route
});


app.get('/edit/:userid', async (req, res) => {
    
 let user = await userModel.findOne({_id:req.params.usericld})
 res.render('edit', {user})
});

app.post('/update/:userid', async (req, res) => {
    let {name,email,img} = req.body;
    let user = await userModel.findOneAndUpdate({_id:req.params.userid},{name,email,img},{new:true});
    res.redirect('/read');
   });
   




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
