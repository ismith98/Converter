var rates;	

//An object of key value pairs between the 3 letter variable returned from the API
//And the full name of the currency that it represents
var currencyNames = {};	

// HTML elements. Query them once because it takes time
var topQuantityInput;
var bottomQuantityInput;
var topQuantityHeader;
var bottomQuantityHeader;
var topCurrencyHeader;
var bottomCurrencyHeader;
var topDropDownMenu;
var bottomDropDownMenu;


var flip;

// The value of the drop down menus
// These values are 3 lettered varibles from the API's json
var topCountry;
var bottomCountry;

//Start the program
run();





async function run() {
	await getRates();
	getHtmlElements();
	for(let country in rates) {
		//Set the select element with the list of currencies
		setCurrencyNames(country);
	}
	// What the app displays when the page loads
	init();
	
	// Initialize the listeners for the text inputs and drop down menus
	initListeners();
	
}

async function getRates() {
	//Send a request to our proxy server which will get the API information
	let response = await fetch("/exchange");
	
	let exchange = await response.json();
	
	// Key value pair of countries and their repsective rates
	// The countries are represented by unique 3 lettered variables
	rates = exchange.rates;
}

function getHtmlElements() {
	topQuantityInput = document.querySelector("#topQuantityInput");
	bottomQuantityInput = document.querySelector("#bottomQuantityInput");
	topQuantityHeader = document.querySelector('#topQuantityHeader');
	bottomQuantityHeader = document.querySelector('#bottomQuantityHeader');
	topCurrencyHeader = document.querySelector('#topCurrencyHeader');
	bottomCurrencyHeader = document.querySelector('#bottomCurrencyHeader');
	topDropDownMenu = document.querySelector('#topDropDownMenu');
	bottomDropDownMenu = document.querySelector('#bottomDropDownMenu');
}

// What the app displays when the page loads
function init() {

	// The value of the drop down menus
	// These values are 3 lettered varibles from the exchage API's json
	topCountry = topDropDownMenu.value;
	bottomCountry = bottomDropDownMenu.value;
	

	topCurrencyHeader.innerText = currencyNames[topCountry];
	bottomCurrencyHeader.innerText = currencyNames[bottomCountry];
	flip = true;
	
	//Convert the currency
	convert(rates[topCountry], rates[bottomCountry], flip);

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
		quantity = topQuantityInput.value;
		console.log('!solveTop');
		// Calculate the result
		result = (rate2  / rate1 ) * quantity;
		
		// Round the result to the second decimal point.
		// The plus sign that drops any "extra" zeroes at the end.
		result = +result.toFixed(2);
		//result = Math.round(result * 100) / 100;
		
		//Display the result in the input and header elements
		bottomQuantityInput.value = result;
		bottomQuantityHeader.innerText = result + " ";
		
		//Update the header that the input element has changed
		topQuantityHeader.innerText = quantity;
	} else {
		// Get the quantity of the second input element
		quantity = bottomQuantityInput.value;

		// Calculate the result
		result = (rate1  / rate2 ) * quantity;

		// Round the result to the second decimal point.
		// The plus sign that drops any "extra" zeroes at the end.
		result = +result.toFixed(2);
		//result = Math.round(result * 100) / 100;
		
		//Display the result in the input and header elements
		topQuantityInput.value = result;
		topQuantityHeader.innerText = result + " ";
		
		//Update the header that the input element has changed
		bottomQuantityHeader.innerText = quantity + " ";
	}
}

// Initialize the listeners
function initListeners() {
	
	//Set up listeners for each time quantityElements recieve input
	topQuantityInput.addEventListener("input", ()=> {
		flip = true;
		convert(rates[topCountry], rates[bottomCountry], flip);
	});
	bottomQuantityInput.addEventListener("input", ()=> {
		flip = false;
		convert(rates[topCountry], rates[bottomCountry], flip);
	});
	
	
	//Set up listeners for each time currencyListElements recieve input
	topDropDownMenu.addEventListener("input", ()=> {
		
		//Get the 3 letter symbol of element 1
		topCountry = topDropDownMenu.value;
		
		// Change the elements text to the new currency
		topCurrencyHeader.innerText = currencyNames[topCountry];
		flip = false;
		convert(rates[topCountry], rates[bottomCountry], flip);
	});
	
	bottomDropDownMenu.addEventListener("input", ()=> {
		
		//Get the 3 letter symbol of element 2
		bottomCountry = bottomDropDownMenu.value;

		// Change the elements text to the new currency
		bottomCurrencyHeader.innerText = currencyNames[bottomCountry];
		flip = true;
		convert(rates[topCountry], rates[bottomCountry], flip);
	});
}

//Set the select element with the list of currencies given from the API
function setCurrencyNames(country) {
	switch(country) {
			case 'CAD': 
				currencyNames.CAD = "Canadian Dollar ";
				topDropDownMenu.innerHTML += `<option value='CAD'>${currencyNames.CAD}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='CAD'>${currencyNames.CAD}</option>`;
				break;
			case 'HKD':
				currencyNames.HKD = "Hong Kong Dollar ";
				topDropDownMenu.innerHTML += `<option value='HKD'>${currencyNames.HKD}</option>`;
				//Give this element the selected attribute
				bottomDropDownMenu.innerHTML += `<option value='HKD' selected>${currencyNames.HKD}</option>`;
				break;
			case 'ISK':
				currencyNames.ISK = "Icelandic Krona ";
				topDropDownMenu.innerHTML += `<option value='ISK'>${currencyNames.ISK}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='ISK'>${currencyNames.ISK}</option>`;
				break;
			case 'PHP':
				currencyNames.PHP = "Philippine Peso ";
				topDropDownMenu.innerHTML += `<option value='PHP'>${currencyNames.PHP}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='PHP'>${currencyNames.PHP}</option>`;
				break;
			case 'DKK':
				currencyNames.DKK = "Danish Krone ";
				topDropDownMenu.innerHTML += `<option value='DKK'>${currencyNames.DKK}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='DKK'>${currencyNames.DKK}</option>`;
				break;
			case 'HUF':
				currencyNames.HUF = "Hungarian Forint ";
				topDropDownMenu.innerHTML += `<option value='HUF'>${currencyNames.HUF}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='HUF'>${currencyNames.HUF}</option>`;
				break;
			case 'CZK':
				currencyNames.CZK = "Czech Koruna ";
				topDropDownMenu.innerHTML += `<option value='CZK'>${currencyNames.CZK}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='CZK'>${currencyNames.CZK}</option>`;
				break;
			case 'AUD':
				currencyNames.AUD = "Australian Dollar ";
				topDropDownMenu.innerHTML += `<option value='AUD'>${currencyNames.AUD}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='AUD'>${currencyNames.AUD}</option>`;
				break;
			case 'RON':
				currencyNames.RON = "Romanian Leu ";
				topDropDownMenu.innerHTML += `<option value='RON'>${currencyNames.RON}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='RON'>${currencyNames.RON}</option>`;
				break;
			case 'SEK':
				currencyNames.SEK = "Swedish Krona ";
				topDropDownMenu.innerHTML += `<option value='SEK'>${currencyNames.SEK}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='SEK'>${currencyNames.SEK}</option>`;
				break;
			case 'IDR':
				currencyNames.IDR = "Indonesian Rupiah ";
				topDropDownMenu.innerHTML += `<option value='IDR'>${currencyNames.IDR}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='IDR'>${currencyNames.IDR}</option>`;
				break;
			case 'INR':
				currencyNames.INR = "Indian Rupee ";
				topDropDownMenu.innerHTML += `<option value='INR'>${currencyNames.INR}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='INR'>${currencyNames.INR}</option>`;
				break;
			case 'BRL':
				currencyNames.BRL = "Brazilian Real "
				topDropDownMenu.innerHTML += `<option value='BRL'>${currencyNames.BRL}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='BRL'>${currencyNames.BRL}</option>`;
				break;
			case 'RUB':
				currencyNames.RUB = "Russian Rouble "
				topDropDownMenu.innerHTML += `<option value='RUB'>${currencyNames.RUB}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='RUB'>${currencyNames.RUB}</option>`;
				break;
			case 'HRK':
				currencyNames.HRK = "Croatian Kuna "
				topDropDownMenu.innerHTML += `<option value='HRK'>${currencyNames.HRK}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='HRK'>${currencyNames.HRK}</option>`;
				break;
			case 'JPY':
				currencyNames.JPY = "Japanese Yen "
				topDropDownMenu.innerHTML += `<option value='JPY'>${currencyNames.JPY}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='JPY'>${currencyNames.JPY}</option>`;
				break;
			case 'THB':
				currencyNames.THB = "Thai Baht "
				topDropDownMenu.innerHTML += `<option value='THB'>${currencyNames.THB}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='THB'>${currencyNames.THB}</option>`;
				break;
			case 'CHF':
				currencyNames.CHF = "Swiss Franc "
				topDropDownMenu.innerHTML += `<option value='CHF'>${currencyNames.CHF}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='CHF'>${currencyNames.CHF}</option>`;
				break;
			case 'SGD':
				currencyNames.SGD = "Singapore Dollar "
				topDropDownMenu.innerHTML += `<option value='SGD'>${currencyNames.SGD}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='SGD'>${currencyNames.SGD}</option>`;
				break;
			case 'PLN':
				currencyNames.PLN = "Polish Zloty "
				topDropDownMenu.innerHTML += `<option value='PLN'>${currencyNames.PLN}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='PLN'>${currencyNames.PLN}</option>`;
				break;
			case 'BGN':
				currencyNames.BGN = "Bulgarian Lev "
				topDropDownMenu.innerHTML += `<option value='BGN'>${currencyNames.BGN}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='BGN'>${currencyNames.BGN}</option>`;
				break;
			case 'TRY':
				currencyNames.TRY = "Turkish Lira "
				topDropDownMenu.innerHTML += `<option value='TRY'>${currencyNames.TRY}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='TRY'>${currencyNames.TRY}</option>`;
				break;
			case 'CNY':
				currencyNames.CNY = "Chinese Yuan Renminbi "
				topDropDownMenu.innerHTML += `<option value='CNY'>${currencyNames.CNY}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='CNY'>${currencyNames.CNY}</option>`;
				break;
			case 'NOK':
				currencyNames.NOK = "Norwegian Krone "
				topDropDownMenu.innerHTML += `<option value='NOK'>${currencyNames.NOK}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='NOK'>${currencyNames.NOK}</option>`;
				break;
			case 'NZD':
				currencyNames.NZD = "New Zealand Dollar "
				topDropDownMenu.innerHTML += `<option value='NZD'>${currencyNames.NZD}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='NZD'>${currencyNames.NZD}</option>`;
				break;
			case 'ZAR':
				currencyNames.ZAR = "South African Rand "
				topDropDownMenu.innerHTML += `<option value='ZAR'>${currencyNames.ZAR}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='ZAR'>${currencyNames.ZAR}</option>`;
				break;
			case 'USD':
				currencyNames.USD = "United States Dollar "
				topDropDownMenu.innerHTML += `<option value='USD'>${currencyNames.USD}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='USD'>${currencyNames.USD}</option>`;
				break;
			case 'MXN':
				currencyNames.MXN = "Mexican Peso "
				topDropDownMenu.innerHTML += `<option value='MXN'>${currencyNames.MXN}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='MXN'>${currencyNames.MXN}</option>`;
				break;
			case 'ILS':
				currencyNames.ILS = "Israeli Shekel "
				topDropDownMenu.innerHTML += `<option value='ILS'>${currencyNames.ILS}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='ILS'>${currencyNames.ILS}</option>`;
				break;
			case 'GBP':
				currencyNames.GBP = "Pound Sterling "
				topDropDownMenu.innerHTML += `<option value='GBP'>${currencyNames.GBP}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='GBP'>${currencyNames.GBP}</option>`;
				break;
			case 'KRW':
				currencyNames.KRW = "South Korean Won "
				topDropDownMenu.innerHTML += `<option value='KRW'>${currencyNames.KRW}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='KRW'>${currencyNames.KRW}</option>`;
				break;
			case 'MYR':
				currencyNames.MYR = "Malaysian Ringgit "
				topDropDownMenu.innerHTML += `<option value='MYR'>${currencyNames.MYR}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='MYR'>${currencyNames.MYR}</option>`;
				break;
			default: 
		
		}
}


