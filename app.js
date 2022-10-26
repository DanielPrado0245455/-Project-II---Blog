const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
let ipath = path.join(__dirname,"public");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(ipath));
app.use(fileUpload());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render(path.join(ipath, "/views/index"));    
});


app.get('/news', (req,res)=>{
    res.render(path.join(ipath, '/views/news'))
})

app.get("/editor", (req, res) => {
    res.render(path.join(ipath, "/views/editor"));   
});



app.get("/:blog", (req, res) => {
    res.render(path.join(ipath, "/views/blog"));
});

app.use((req, res) => {
    res.json("404");
});


//uploading images
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // imagename**id
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = 'public/uploads/' + imagename;

    // create upload

    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{


            // send the upload to the uploads folder


            res.json(`uploads/${imagename}`)
        }
    })
})


app.listen(port, () => console.log(`Listening on port ${port}...`));
