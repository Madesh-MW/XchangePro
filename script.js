const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const rateElement = document.getElementById("rate");
const swapButton = document.getElementById("swap");

// Fetch exchange rates and update the values
function calculate() {
  const fromCurrency = currencyOne.value;
  const toCurrency = currencyTwo.value;

  rateElement.textContent = "Loading...";
  fetch(
    `https://v6.exchangerate-api.com/v6/e4e6cebb82861eddbecc8a07/latest/${fromCurrency}`
  )
    .then((response) => response.json())
    .then((data) => {
      const rate = data.conversion_rates[toCurrency];
      rateElement.textContent = `1 ${fromCurrency} = ${rate.toFixed(
        2
      )} ${toCurrency}`;
      amountTwo.value = (amountOne.value * rate).toFixed(2);
    })
    .catch(() => {
      rateElement.textContent = "Error fetching rates.";
    });
}

// Event listeners
currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
swapButton.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});

// Initial calculation
calculate();
