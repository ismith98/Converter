var express = require("express");
var app = express();
const fetch = require("node-fetch");

var exchangeHttp = "https://api.exchangeratesapi.io/latest";

app
  .use(express.static(__dirname))
  .get("/", (req, res) => res.sendFile("index.html"))
  .get("/exchange", async (req, res) => createProxyServer(req, res))
  .listen(5000, () => console.log("App is listening on port 5000"));

async function createProxyServer(req, res) {
	//Send a get request to the exchange API
	let response = await fetch(exchangeHttp);
	let exchange = await response.json();
	res.json(exchange);
}
