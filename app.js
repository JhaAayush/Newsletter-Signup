const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("static"))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    // console.log(firstName);
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/0356966b71";
    const options = {
        method: "POST",
        auth: "aayush:291b28c62fb1dcfea03a6fc605a3b9f8-us14"
    }

    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
        
        // response.on("data", (data) => {
        //     //console.log(JSON.parse(data));
        // })    
    })

    request.write(jsonData);
    request.end()
    
})

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log("Server started at port 3000.");
})

// API Key
// 291b28c62fb1dcfea03a6fc605a3b9f8-us14

// Lsit ID
// 0356966b71