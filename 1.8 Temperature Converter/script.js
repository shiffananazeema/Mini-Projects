let fahrenheit = document.getElementById("fahrenheit");
let celsius = document.getElementById("celsius");
let kelvin = document.getElementById("kelvin");

fahrenheit.oninput = function () {
  let c = ((fahrenheit.value - 32) * 5) / 9;
  celsius.value = c.toFixed(2);

  let k = ((fahrenheit.value - 32) * 5) / 9 + 273.15;
  kelvin.value = k.toFixed(2);
};

celsius.oninput = function () {
  let f = (celsius.value * 9) / 5 + 32;
  fahrenheit.value = f.toFixed(2);

  let k = parseFloat(celsius.value) + 273.15;
  kelvin.value = k.toFixed(2);
};

kelvin.oninput = function () {
  let f = ((kelvin.value - 273.15) * 9) / 5 + 32;
  fahrenheit.value = f.toFixed(2);

  let c = kelvin.value - 273.15;
  celsius.value = c.toFixed(2);
};
