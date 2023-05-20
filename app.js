const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const exp = require("constants");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res){
    res.sendFile(__dirname+"/signup.html");

})

app.post("/", function(req, res){

    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;

    console.log(fName,lName,email);

    const data = {
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fName,
                LNAME:lName
            }
        }]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/#";
    options = {
        method:"post",
        auth:"anyname:#"
    };
    const request = https.request(url, options, function(response){
        // response.on("data", function(data){
        //     console.log(JSON.parse(data));
        // })
        if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
    })
    request.write(jsonData);
    request.end();
})

app.post('/failure', function(req, res){
    res.redirect('/');
})






const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("server is running on port 3000")
});

