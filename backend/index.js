const express = require("express");
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 4000;


const app = express();
// Allow requests from the frontend Render URL
const corsOptions = {
  origin: ['https://web-conference-1.onrender.com'], // Replace with your frontend Render URL
  credentials: true,
};

app.use(cors(corsOptions));
//app.use(cors());
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   })
// );
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

const router = require('./routes/routes');
app.use('/', router);

/*app.listen(3001, () => {
  console.log("Server started on port 3001. Ctrl^c to quit.");
});*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})