const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const swapBtn = document.getElementById("swapBtn");
const convertBtn = document.getElementById("convertBtn");
const message = document.getElementById("message");
const result = document.getElementById("result");

const currencyList = [
  "USD",
  "EUR",
  "GBP",
  "AUD",
  "INR",
  "CAD",
  "JPY",
  "CNY",
  "AED",
  "SGD",
];

function loadCurrencies() {
  currencyList.forEach((currency) => {
    const fromOption = document.createElement("option");
    fromOption.value = currency;
    fromOption.textContent = currency;
    fromCurrency.appendChild(fromOption);

    const toOption = document.createElement("option");
    toOption.value = currency;
    toOption.textContent = currency;
    toCurrency.appendChild(toOption);
  });

  fromCurrency.value = "AUD";
  toCurrency.value = "INR";
}

async function convertCurrency() {
  const amount = amountInput.value.trim();
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (amount === "" || Number(amount) <= 0) {
    message.textContent = "Please enter a valid amount.";
    result.textContent = "";
    return;
  }

  if (from === to) {
    message.textContent = "";
    result.textContent = `${amount} ${from} = ${amount} ${to}`;
    return;
  }

  message.textContent = "Converting...";
  result.textContent = "";

  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await response.json();

    if (data.result !== "success") {
      message.textContent = "Failed to fetch exchange rate.";
      result.textContent = "";
      return;
    }

    const rate = data.rates[to];
    const convertedAmount = (Number(amount) * rate).toFixed(2);

    message.textContent = "";
    result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
  } catch (error) {
    message.textContent = "Something went wrong. Please try again.";
    result.textContent = "";
    console.error(error);
  }
}

swapBtn.addEventListener("click", () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  if (amountInput.value.trim() !== "") {
    convertCurrency();
  }
});

convertBtn.addEventListener("click", convertCurrency);

amountInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    convertCurrency();
  }
});

loadCurrencies();
