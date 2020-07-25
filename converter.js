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
	
	// Connect the 3 lettered currency representation to its full name
	// Put the names into a list to an array so it can be sorted before
	// adding it to the drop down menu
	let currencyNamesList = [];
	for(let currency in rates) {
		currencyNamesList = setCurrencyNames(currency, currencyNamesList);
	}
	
	// Sort the list and add it to the drop down menu
	currencyNamesList.sort();
	for(let i = 0; i < currencyNamesList.length; i++) {
		addCurrencyToDropDownMenu(currencyNamesList[i]);
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

// Connect the 3 lettered currency representation to its full name
function setCurrencyNames(currency, currencyNamesList) {
	switch(currency) {
			case 'CAD': 
				currencyNames.CAD = "Canadian Dollar ";
				currencyNamesList.push(currencyNames.CAD);
				break;
			case 'HKD':
				currencyNames.HKD = "Hong Kong Dollar ";
				currencyNamesList.push(currencyNames.HKD);
				break;
			case 'ISK':
				currencyNames.ISK = "Icelandic Krona ";
				currencyNamesList.push(currencyNames.ISK);
				break;
			case 'PHP':
				currencyNames.PHP = "Philippine Peso ";
				currencyNamesList.push(currencyNames.PHP);
				break;
			case 'DKK':
				currencyNames.DKK = "Danish Krone ";
				currencyNamesList.push(currencyNames.DKK);
				break;
			case 'HUF':
				currencyNames.HUF = "Hungarian Forint ";
				currencyNamesList.push(currencyNames.HUF);
				break;
			case 'CZK':
				currencyNames.CZK = "Czech Koruna ";
				currencyNamesList.push(currencyNames.CZK);
				break;
			case 'AUD':
				currencyNames.AUD = "Australian Dollar ";
				currencyNamesList.push(currencyNames.AUD);
				break;
			case 'RON':
				currencyNames.RON = "Romanian Leu ";
				currencyNamesList.push(currencyNames.RON);
				break;
			case 'SEK':
				currencyNames.SEK = "Swedish Krona ";
				currencyNamesList.push(currencyNames.SEK);
				break;
			case 'IDR':
				currencyNames.IDR = "Indonesian Rupiah ";
				currencyNamesList.push(currencyNames.IDR);
				break;
			case 'INR':
				currencyNames.INR = "Indian Rupee ";
				currencyNamesList.push(currencyNames.INR);
				break;
			case 'BRL':
				currencyNames.BRL = "Brazilian Real ";
				currencyNamesList.push(currencyNames.BRL);
				break;
			case 'RUB':
				currencyNames.RUB = "Russian Rouble ";
				currencyNamesList.push(currencyNames.RUB);
				break;
			case 'HRK':
				currencyNames.HRK = "Croatian Kuna ";
				currencyNamesList.push(currencyNames.HRK);
				break;
			case 'JPY':
				currencyNames.JPY = "Japanese Yen ";
				currencyNamesList.push(currencyNames.JPY);
				break;
			case 'THB':
				currencyNames.THB = "Thai Baht ";
				currencyNamesList.push(currencyNames.THB);
				break;
			case 'CHF':
				currencyNames.CHF = "Swiss Franc ";
				currencyNamesList.push(currencyNames.CHF);
				break;
			case 'SGD':
				currencyNames.SGD = "Singapore Dollar ";
				currencyNamesList.push(currencyNames.SGD);
				break;
			case 'PLN':
				currencyNames.PLN = "Polish Zloty ";
				currencyNamesList.push(currencyNames.PLN);
				break;
			case 'BGN':
				currencyNames.BGN = "Bulgarian Lev ";
				currencyNamesList.push(currencyNames.BGN);
				break;
			case 'TRY':
				currencyNames.TRY = "Turkish Lira ";
				currencyNamesList.push(currencyNames.TRY);
				break;
			case 'CNY':
				currencyNames.CNY = "Chinese Yuan Renminbi ";
				currencyNamesList.push(currencyNames.CNY);
				break;
			case 'NOK':
				currencyNames.NOK = "Norwegian Krone ";
				currencyNamesList.push(currencyNames.NOK);
				break;
			case 'NZD':
				currencyNames.NZD = "New Zealand Dollar "
				currencyNamesList.push(currencyNames.NZD);
				break;
			case 'ZAR':
				currencyNames.ZAR = "South African Rand ";
				currencyNamesList.push(currencyNames.ZAR);
				break;
			case 'USD':
				currencyNames.USD = "United States Dollar ";
				currencyNamesList.push(currencyNames.USD);
				break;
			case 'MXN':
				currencyNames.MXN = "Mexican Peso ";
				currencyNamesList.push(currencyNames.MXN);
				break;
			case 'ILS':
				currencyNames.ILS = "Israeli Shekel ";
				currencyNamesList.push(currencyNames.ILS);
				break;
			case 'GBP':
				currencyNames.GBP = "Pound Sterling ";
				currencyNamesList.push(currencyNames.GBP);
				break;
			case 'KRW':
				currencyNames.KRW = "South Korean Won ";
				currencyNamesList.push(currencyNames.KRW);
				break;
			case 'MYR':
				currencyNames.MYR = "Malaysian Ringgit ";
				currencyNamesList.push(currencyNames.MYR);
				break;
			default: 
		
		}

	return currencyNamesList;

}

function addCurrencyToDropDownMenu(currency) {
	switch(currency) {
			case currencyNames.CAD: 
				currencyNames.CAD = "Canadian Dollar ";
				topDropDownMenu.innerHTML += `<option value='CAD'>${currencyNames.CAD}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='CAD'>${currencyNames.CAD}</option>`;
				break;
			case currencyNames.HKD:
				topDropDownMenu.innerHTML += `<option value='HKD'>${currencyNames.HKD}</option>`;
				//Give this element the selected attribute
				bottomDropDownMenu.innerHTML += `<option value='HKD' selected>${currencyNames.HKD}</option>`;
				break;
			case currencyNames.ISK:
				topDropDownMenu.innerHTML += `<option value='ISK'>${currencyNames.ISK}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='ISK'>${currencyNames.ISK}</option>`;
				break;
			case currencyNames.PHP:
				topDropDownMenu.innerHTML += `<option value='PHP'>${currencyNames.PHP}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='PHP'>${currencyNames.PHP}</option>`;
				break;
			case currencyNames.DKK:
				topDropDownMenu.innerHTML += `<option value='DKK'>${currencyNames.DKK}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='DKK'>${currencyNames.DKK}</option>`;
				break;
			case currencyNames.HUF:
				topDropDownMenu.innerHTML += `<option value='HUF'>${currencyNames.HUF}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='HUF'>${currencyNames.HUF}</option>`;
				break;
			case currencyNames.CZK:
				topDropDownMenu.innerHTML += `<option value='CZK'>${currencyNames.CZK}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='CZK'>${currencyNames.CZK}</option>`;
				break;
			case currencyNames.AUD:
				topDropDownMenu.innerHTML += `<option value='AUD'>${currencyNames.AUD}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='AUD'>${currencyNames.AUD}</option>`;
				break;
			case currencyNames.RON:
				topDropDownMenu.innerHTML += `<option value='RON'>${currencyNames.RON}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='RON'>${currencyNames.RON}</option>`;
				break;
			case currencyNames.SEK:
				topDropDownMenu.innerHTML += `<option value='SEK'>${currencyNames.SEK}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='SEK'>${currencyNames.SEK}</option>`;
				break;
			case currencyNames.IDR:
				topDropDownMenu.innerHTML += `<option value='IDR'>${currencyNames.IDR}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='IDR'>${currencyNames.IDR}</option>`;
				break;
			case currencyNames.INR:
				topDropDownMenu.innerHTML += `<option value='INR'>${currencyNames.INR}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='INR'>${currencyNames.INR}</option>`;
				break;
			case currencyNames.BRL:
				topDropDownMenu.innerHTML += `<option value='BRL'>${currencyNames.BRL}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='BRL'>${currencyNames.BRL}</option>`;
				break;
			case currencyNames.RUB:
				topDropDownMenu.innerHTML += `<option value='RUB'>${currencyNames.RUB}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='RUB'>${currencyNames.RUB}</option>`;
				break;
			case currencyNames.HRK:
				topDropDownMenu.innerHTML += `<option value='HRK'>${currencyNames.HRK}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='HRK'>${currencyNames.HRK}</option>`;
				break;
			case currencyNames.JPY:
				topDropDownMenu.innerHTML += `<option value='JPY'>${currencyNames.JPY}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='JPY'>${currencyNames.JPY}</option>`;
				break;
			case currencyNames.THB:
				topDropDownMenu.innerHTML += `<option value='THB'>${currencyNames.THB}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='THB'>${currencyNames.THB}</option>`;
				break;
			case currencyNames.CHF:
				topDropDownMenu.innerHTML += `<option value='CHF'>${currencyNames.CHF}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='CHF'>${currencyNames.CHF}</option>`;
				break;
			case currencyNames.SGD:
				topDropDownMenu.innerHTML += `<option value='SGD'>${currencyNames.SGD}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='SGD'>${currencyNames.SGD}</option>`;
				break;
			case currencyNames.PLN:
				topDropDownMenu.innerHTML += `<option value='PLN'>${currencyNames.PLN}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='PLN'>${currencyNames.PLN}</option>`;
				break;
			case currencyNames.BGN:
				topDropDownMenu.innerHTML += `<option value='BGN'>${currencyNames.BGN}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='BGN'>${currencyNames.BGN}</option>`;
				break;
			case currencyNames.TRY:
				topDropDownMenu.innerHTML += `<option value='TRY'>${currencyNames.TRY}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='TRY'>${currencyNames.TRY}</option>`;
				break;
			case currencyNames.CNY:
				topDropDownMenu.innerHTML += `<option value='CNY'>${currencyNames.CNY}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='CNY'>${currencyNames.CNY}</option>`;
				break;
			case currencyNames.NOK:
				topDropDownMenu.innerHTML += `<option value='NOK'>${currencyNames.NOK}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='NOK'>${currencyNames.NOK}</option>`;
				break;
			case currencyNames.NZD:
				topDropDownMenu.innerHTML += `<option value='NZD'>${currencyNames.NZD}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='NZD'>${currencyNames.NZD}</option>`;
				break;
			case currencyNames.ZAR:
				topDropDownMenu.innerHTML += `<option value='ZAR'>${currencyNames.ZAR}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='ZAR'>${currencyNames.ZAR}</option>`;
				break;
			case currencyNames.USD:
				topDropDownMenu.innerHTML += `<option value='USD'>${currencyNames.USD}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='USD'>${currencyNames.USD}</option>`;
				break;
			case currencyNames.MXN:
				topDropDownMenu.innerHTML += `<option value='MXN'>${currencyNames.MXN}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='MXN'>${currencyNames.MXN}</option>`;
				break;
			case currencyNames.ILS:
				topDropDownMenu.innerHTML += `<option value='ILS'>${currencyNames.ILS}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='ILS'>${currencyNames.ILS}</option>`;
				break;
			case currencyNames.GBP:
				topDropDownMenu.innerHTML += `<option value='GBP'>${currencyNames.GBP}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='GBP'>${currencyNames.GBP}</option>`;
				break;
			case currencyNames.KRW:
				topDropDownMenu.innerHTML += `<option value='KRW'>${currencyNames.KRW}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='KRW'>${currencyNames.KRW}</option>`;
				break;
			case currencyNames.MYR:
				topDropDownMenu.innerHTML += `<option value='MYR'>${currencyNames.MYR}</option>`;
				bottomDropDownMenu.innerHTML += `<option value='MYR'>${currencyNames.MYR}</option>`;
				break;
			default: 
		
		}
}
