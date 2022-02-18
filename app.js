const express = require('express');
const bodyParser = require('body-parser');
const https = require('https')
const { options } = require('nodemon/lib/config');
const { redirect } = require('express/lib/response');

app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/signup.html');
})
app.post('/',(req,res)=>{
    const Email = req.body.Email;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const ListId = '5b920ca590';
    const option = {
        method: "POST",
        auth:"Harsh1:6738c6cecf6155963812f0a4c12fdff4-us14"
    }

    const object = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }
    const jsonObject = JSON.stringify(object);
    const url = `https://us14.api.mailchimp.com/3.0/lists/${ListId}/`
   const request =  https.request(url,option,function(response){
            response.on("data",(object)=>{
                console.log(JSON.parse(object))
            })
            if ( response.statusCode === 200){
                res.redirect('/success')
            }else{
                res.redirect('/failure');
            }
    })
    request.write(jsonObject);
    request.end();
    res.redirect('/success');
})
app.get('/success',(req,res)=>{
    res.sendFile(__dirname +'/success.html');
})
app.get('/failure',(req,res)=>{
    res.sendFile(__dirname +'/failure.html');
})

app.listen(5000,()=>{
    console.log('The Server is running on port 5000');
})

//API KEy
// //6738c6cecf6155963812f0a4c12fdff4-us14
