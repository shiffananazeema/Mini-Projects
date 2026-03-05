var count = 0;

function decrease() {
  count--;
  document.querySelector("h1").innerHTML = count;
}
function reset() {
  count = 0;
  document.querySelector("h1").innerHTML = count;
}
function increase() {
  count++;
  document.querySelector("h1").innerHTML = count;
}
