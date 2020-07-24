var exchange;	// The parsed json object returned from the api

// Key value pair of the 3 lettered variables retured from the API and rate 
// that it represents
var rates;	

//An object of key value pairs between the 3 letter variable returned from the API
//And the full name of the currency that it represents
var currencyList = {};	

// HTML elements. Query them once because it takes time
var quantityElement1;
var quantityElement2;
var quantityHeaderElement1 = document.querySelector('#quantityHeader1');
var quantityHeaderElement2 = document.querySelector('#quantityHeader2');
var currencyHeaderElement1 = document.querySelector('#currencyHeader1');
var currencyHeaderElement2 = document.querySelector('#currencyHeader2');
var currencyListElement1 = document.querySelector('#currencyList1');
var currencyListElement2 = document.querySelector('#currencyList2');

var flip;

// The value of the currency from the drop down lists
// These values are 3 lettered varibles from the API's json
var value1;
var value2;

//Start the program
run();





async function run() {
	await getAPI();
	for(var key in rates) {
		//Set the select element with the list of currencies
		setCurrencyList(key);
	}
	console.log(currencyList);
	// What the app displays when the page loads
	init();
	
	// Initialize the listeners
	initListeners();
	
}

async function getAPI() {
	//Send a request to our proxy server which will get the API information
	let response = await fetch("/exchange");
	exchange = await response.json();
	rates = exchange.rates;
	//console.log(exchange);
}

// What the app displays when the page loads
function init() {
	// Get the currency which the drop down list has selected as default
	// These values are 3 lettered varibles from the API's json
	value1 = currencyListElement1.value;
	value2 = currencyListElement2.value;
	
	quantityElement1 = document.querySelector("#quantity1");
	quantityElement2 = document.querySelector("#quantity2");
	console.log(rates[value1]);
	console.log(rates[value2]);
	currencyHeaderElement1.innerText = currencyList[value1];
	currencyHeaderElement2.innerText = currencyList[value2];
	flip = true;
	
	convert(rates[value1], rates[value2], flip);

	// Date for the disclosure
	let today = new Date();
	let dateElement = document.querySelector("#date");
	dateElement.innerText = today.toUTCString();
}

//Convert one currency to another
function convert(rate1, rate2, flip) {
	//If the flip flag is true, then reverse the order of the division
	let quantity;
	let result;
	
	if(flip) {
		// Get the quantity of the first input element
		quantity = quantityElement1.value;
		console.log('!solveTop');
		// Calculate the result
		result = (rate2  / rate1 ) * quantity;
		
		// Round the result to the second decimal point.
		// The plus sign that drops any "extra" zeroes at the end.
		result = +result.toFixed(2);
		//result = Math.round(result * 100) / 100;
		
		//Display the result in the input and header elements
		quantityElement2.value = result;
		quantityHeaderElement2.innerText = result + " ";
		
		//Update the header that the input element has changed
		quantityHeaderElement1.innerText = quantity;
	} else {
		// Get the quantity of the second input element
		quantity = quantityElement2.value;

		// Calculate the result
		result = (rate1  / rate2 ) * quantity;

		// Round the result to the second decimal point.
		// The plus sign that drops any "extra" zeroes at the end.
		result = +result.toFixed(2);
		//result = Math.round(result * 100) / 100;
		
		//Display the result in the input and header elements
		quantityElement1.value = result;
		quantityHeaderElement1.innerText = result + " ";
		
		//Update the header that the input element has changed
		quantityHeaderElement2.innerText = quantity + " ";
	}
}

// Initialize the listeners
function initListeners() {
	
	//Set up listeners for each time quantityElements recieve input
	quantityElement1.addEventListener("input", ()=> {
		flip = true;
		convert(rates[value1], rates[value2], flip);
	});
	quantityElement2.addEventListener("input", ()=> {
		flip = false;
		convert(rates[value1], rates[value2], flip);
	});
	
	
	//Set up listeners for each time currencyListElements recieve input
	currencyListElement1.addEventListener("input", ()=> {
		
		//Get the 3 letter symbol of element 1
		value1 = currencyListElement1.value;
		
		// Change the elements text to the new currency
		currencyHeaderElement1.innerText = currencyList[value1];
		flip = false;
		convert(rates[value1], rates[value2], flip);
	});
	
	currencyListElement2.addEventListener("input", ()=> {
		
		//Get the 3 letter symbol of element 2
		value2 = currencyListElement2.value;

		// Change the elements text to the new currency
		currencyHeaderElement2.innerText = currencyList[value2];
		flip = true;
		convert(rates[value1], rates[value2], flip);
	});
}

//Set the select element with the list of currencies given from the API
function setCurrencyList(key) {
	switch(key) {
			case 'CAD': 
				currencyList.CAD = "Canadian Dollar ";
				currencyListElement1.innerHTML += `<option value='CAD'>${currencyList.CAD}</option>`;
				currencyListElement2.innerHTML += `<option value='CAD'>${currencyList.CAD}</option>`;
				break;
			case 'HKD':
				currencyList.HKD = "Hong Kong Dollar ";
				currencyListElement1.innerHTML += `<option value='HKD'>${currencyList.HKD}</option>`;
				//Give this element the selected attribute
				currencyListElement2.innerHTML += `<option value='HKD' selected>${currencyList.HKD}</option>`;
				break;
			case 'ISK':
				currencyList.ISK = "Icelandic Krona ";
				currencyListElement1.innerHTML += `<option value='ISK'>${currencyList.ISK}</option>`;
				currencyListElement2.innerHTML += `<option value='ISK'>${currencyList.ISK}</option>`;
				break;
			case 'PHP':
				currencyList.PHP = "Philippine Peso ";
				currencyListElement1.innerHTML += `<option value='PHP'>${currencyList.PHP}</option>`;
				currencyListElement2.innerHTML += `<option value='PHP'>${currencyList.PHP}</option>`;
				break;
			case 'DKK':
				currencyList.DKK = "Danish Krone ";
				currencyListElement1.innerHTML += `<option value='DKK'>${currencyList.DKK}</option>`;
				currencyListElement2.innerHTML += `<option value='DKK'>${currencyList.DKK}</option>`;
				break;
			case 'HUF':
				currencyList.HUF = "Hungarian Forint ";
				currencyListElement1.innerHTML += `<option value='HUF'>${currencyList.HUF}</option>`;
				currencyListElement2.innerHTML += `<option value='HUF'>${currencyList.HUF}</option>`;
				break;
			case 'CZK':
				currencyList.CZK = "Czech Koruna ";
				currencyListElement1.innerHTML += `<option value='CZK'>${currencyList.CZK}</option>`;
				currencyListElement2.innerHTML += `<option value='CZK'>${currencyList.CZK}</option>`;
				break;
			case 'AUD':
				currencyList.AUD = "Australian Dollar ";
				currencyListElement1.innerHTML += `<option value='AUD'>${currencyList.AUD}</option>`;
				currencyListElement2.innerHTML += `<option value='AUD'>${currencyList.AUD}</option>`;
				break;
			case 'RON':
				currencyList.RON = "Romanian Leu ";
				currencyListElement1.innerHTML += `<option value='RON'>${currencyList.RON}</option>`;
				currencyListElement2.innerHTML += `<option value='RON'>${currencyList.RON}</option>`;
				break;
			case 'SEK':
				currencyList.SEK = "Swedish Krona ";
				currencyListElement1.innerHTML += `<option value='SEK'>${currencyList.SEK}</option>`;
				currencyListElement2.innerHTML += `<option value='SEK'>${currencyList.SEK}</option>`;
				break;
			case 'IDR':
				currencyList.IDR = "Indonesian Rupiah ";
				currencyListElement1.innerHTML += `<option value='IDR'>${currencyList.IDR}</option>`;
				currencyListElement2.innerHTML += `<option value='IDR'>${currencyList.IDR}</option>`;
				break;
			case 'INR':
				currencyList.INR = "Indian Rupee ";
				currencyListElement1.innerHTML += `<option value='INR'>${currencyList.INR}</option>`;
				currencyListElement2.innerHTML += `<option value='INR'>${currencyList.INR}</option>`;
				break;
			case 'BRL':
				currencyList.BRL = "Brazilian Real "
				currencyListElement1.innerHTML += `<option value='BRL'>${currencyList.BRL}</option>`;
				currencyListElement2.innerHTML += `<option value='BRL'>${currencyList.BRL}</option>`;
				break;
			case 'RUB':
				currencyList.RUB = "Russian Rouble "
				currencyListElement1.innerHTML += `<option value='RUB'>${currencyList.RUB}</option>`;
				currencyListElement2.innerHTML += `<option value='RUB'>${currencyList.RUB}</option>`;
				break;
			case 'HRK':
				currencyList.HRK = "Croatian Kuna "
				currencyListElement1.innerHTML += `<option value='HRK'>${currencyList.HRK}</option>`;
				currencyListElement2.innerHTML += `<option value='HRK'>${currencyList.HRK}</option>`;
				break;
			case 'JPY':
				currencyList.JPY = "Japanese Yen "
				currencyListElement1.innerHTML += `<option value='JPY'>${currencyList.JPY}</option>`;
				currencyListElement2.innerHTML += `<option value='JPY'>${currencyList.JPY}</option>`;
				break;
			case 'THB':
				currencyList.THB = "Thai Baht "
				currencyListElement1.innerHTML += `<option value='THB'>${currencyList.THB}</option>`;
				currencyListElement2.innerHTML += `<option value='THB'>${currencyList.THB}</option>`;
				break;
			case 'CHF':
				currencyList.CHF = "Swiss Franc "
				currencyListElement1.innerHTML += `<option value='CHF'>${currencyList.CHF}</option>`;
				currencyListElement2.innerHTML += `<option value='CHF'>${currencyList.CHF}</option>`;
				break;
			case 'SGD':
				currencyList.SGD = "Singapore Dollar "
				currencyListElement1.innerHTML += `<option value='SGD'>${currencyList.SGD}</option>`;
				currencyListElement2.innerHTML += `<option value='SGD'>${currencyList.SGD}</option>`;
				break;
			case 'PLN':
				currencyList.PLN = "Polish Zloty "
				currencyListElement1.innerHTML += `<option value='PLN'>${currencyList.PLN}</option>`;
				currencyListElement2.innerHTML += `<option value='PLN'>${currencyList.PLN}</option>`;
				break;
			case 'BGN':
				currencyList.BGN = "Bulgarian Lev "
				currencyListElement1.innerHTML += `<option value='BGN'>${currencyList.BGN}</option>`;
				currencyListElement2.innerHTML += `<option value='BGN'>${currencyList.BGN}</option>`;
				break;
			case 'TRY':
				currencyList.TRY = "Turkish Lira "
				currencyListElement1.innerHTML += `<option value='TRY'>${currencyList.TRY}</option>`;
				currencyListElement2.innerHTML += `<option value='TRY'>${currencyList.TRY}</option>`;
				break;
			case 'CNY':
				currencyList.CNY = "Chinese Yuan Renminbi "
				currencyListElement1.innerHTML += `<option value='CNY'>${currencyList.CNY}</option>`;
				currencyListElement2.innerHTML += `<option value='CNY'>${currencyList.CNY}</option>`;
				break;
			case 'NOK':
				currencyList.NOK = "Norwegian Krone "
				currencyListElement1.innerHTML += `<option value='NOK'>${currencyList.NOK}</option>`;
				currencyListElement2.innerHTML += `<option value='NOK'>${currencyList.NOK}</option>`;
				break;
			case 'NZD':
				currencyList.NZD = "New Zealand Dollar "
				currencyListElement1.innerHTML += `<option value='NZD'>${currencyList.NZD}</option>`;
				currencyListElement2.innerHTML += `<option value='NZD'>${currencyList.NZD}</option>`;
				break;
			case 'ZAR':
				currencyList.ZAR = "South African Rand "
				currencyListElement1.innerHTML += `<option value='ZAR'>${currencyList.ZAR}</option>`;
				currencyListElement2.innerHTML += `<option value='ZAR'>${currencyList.ZAR}</option>`;
				break;
			case 'USD':
				currencyList.USD = "United States Dollar "
				currencyListElement1.innerHTML += `<option value='USD'>${currencyList.USD}</option>`;
				currencyListElement2.innerHTML += `<option value='USD'>${currencyList.USD}</option>`;
				break;
			case 'MXN':
				currencyList.MXN = "Mexican Peso "
				currencyListElement1.innerHTML += `<option value='MXN'>${currencyList.MXN}</option>`;
				currencyListElement2.innerHTML += `<option value='MXN'>${currencyList.MXN}</option>`;
				break;
			case 'ILS':
				currencyList.ILS = "Israeli Shekel "
				currencyListElement1.innerHTML += `<option value='ILS'>${currencyList.ILS}</option>`;
				currencyListElement2.innerHTML += `<option value='ILS'>${currencyList.ILS}</option>`;
				break;
			case 'GBP':
				currencyList.GBP = "Pound Sterling "
				currencyListElement1.innerHTML += `<option value='GBP'>${currencyList.GBP}</option>`;
				currencyListElement2.innerHTML += `<option value='GBP'>${currencyList.GBP}</option>`;
				break;
			case 'KRW':
				currencyList.KRW = "South Korean Won "
				currencyListElement1.innerHTML += `<option value='KRW'>${currencyList.KRW}</option>`;
				currencyListElement2.innerHTML += `<option value='KRW'>${currencyList.KRW}</option>`;
				break;
			case 'MYR':
				currencyList.MYR = "Malaysian Ringgit "
				currencyListElement1.innerHTML += `<option value='MYR'>${currencyList.MYR}</option>`;
				currencyListElement2.innerHTML += `<option value='MYR'>${currencyList.MYR}</option>`;
				break;
			default: 
		
		}
}

/*function getAPI() {
	fetch(exchangeHttp2)
		.then(response => response.json())
		.then(data => {console.log(data)})
}*/


