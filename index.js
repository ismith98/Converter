var express = require("express");
var app = express();
const fetch = require("node-fetch");

var exchangeHttp = "https://api.exchangeratesapi.io/latest";


app.use(express.static(__dirname));
app.get("/", (req, res) => {
	res.sendFile("index.html");
})

//Create a proxy server to get requests from
app.get("/exchange", async (req, res) => {
	//Send a get request to the exchange API
	let response = await fetch(exchangeHttp);
	let exchange = await response.json();
	res.json(exchange);
})

app.listen(5000, () => console.log("App is listening on port 5000"));