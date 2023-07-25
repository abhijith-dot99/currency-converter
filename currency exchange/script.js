async function toFetch(sourceCurrency, targetCurrency) {
    const myapiKey =  '220aa87d515d36c288fde069';
    const myUrl =  `https://v6.exchangerate-api.com/v6/${myapiKey}/latest/${sourceCurrency}`;


    try {
        const response = await fetch(myUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}



async function currencyConverter() {
    const amount = parseFloat(document.getElementById('amount').value);
    const sourceCurrency = document.getElementById('sourceCurrency').value;
    const targetCurrency = document.getElementById('targetCurrency').value;

    console.log('Amount:', amount);
    console.log('Source Currency:', sourceCurrency);
    console.log('Target Currency:', targetCurrency);

    const convertedRate = await toFetch(sourceCurrency, targetCurrency);

    if (convertedRate && convertedRate.conversion_rates) {
        const exchangeRate = convertedRate.conversion_rates[targetCurrency];
        console.log('Exchange Rate:', exchangeRate);

        if (!isNaN(amount)) {
            const convertedAmount = amount * exchangeRate;
            console.log('Converted Amount:', convertedAmount);
            document.getElementById("result").textContent = `${amount} ${sourceCurrency} = ${convertedAmount.toFixed(2)} ${targetCurrency}`;
        } else {
            document.getElementById("errorContainer").textContent = 'Please enter a valid amount.';
        }
    } else {
        document.getElementById("errorContainer").textContent = 'Sorry, Failed to fetch exchange rates.';
    }
}



function swapCurrencies() {
    const sourceSelect = document.getElementById('sourceCurrency');
    const targetSelect = document.getElementById('targetCurrency');

    const tempSourceValue = sourceSelect.value;
    sourceSelect.value = targetSelect.value;
    targetSelect.value = tempSourceValue;

    // const tempCurrency = sourceCurrency;
    // sourceCurrency = targetCurrency;
    // targetCurrency = tempCurrency;

    currencyConverter()
}

