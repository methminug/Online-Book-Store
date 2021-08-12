const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const nodemailer = require('nodemailer')

require("dotenv").config()
const app = express()
const port = process.env.PORT || 6060
app.use(cors())
app.use(express.json())

const password = process.env.EMAIL_PASSWORD;

const url = process.env.ATLAS_URI
global.URL = url
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection

connection.once("open", () => {
    console.log("MongoDB connection successfully")
  })

app.get('/',(req,res) => {
    res.send("Running Successfully")
})

const PrivatePolicy = require("./routers/PrivatePolicy");
app.use("/private-policy",PrivatePolicy)

//Contact Us Email sending configuration
app.post("/contactdata", (req, res) => {
  let data = req.body
  let smtpTransoprt = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
      user: "2021segroup30@gmail.com",
      pass: password,
    },
  })
  let mailOptions = {
    from: data.email,
    to: "2021segroup30@gmail.com",
    subject: `Message from ${data.name}`,
    html: `
        <h3>Informations</h3>
        <ul>
            <li>Name: ${data.name}</li>
            <li>Email: ${data.email}</li>
            <li>Subject: ${data.subject}</li>
        </ul>
        <h3>Message</h3>
        <p>${data.message}</p>
        `,
  }
  smtpTransoprt.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.send(err)
    } else {
      res.send(info)
    }
  })
  smtpTransoprt.close()
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})