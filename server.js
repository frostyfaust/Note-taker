const express = require("express")
const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js')
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({exteneded: true}));
app.use(express.json());

app.use(express.static('public'));

app.use('/',apiRoutes);
app.use('/',htmlRoutes)

app.listen(PORT, () => console.log(`This server has been started on port ${PORT}.`))