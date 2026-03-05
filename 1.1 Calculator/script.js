let exp = "";
const d = document.getElementById("d");
const show = () => (d.textContent = exp || "0");

function press(x) {
  exp += x;
  show();
}
function clr() {
  exp = "";
  show();
}
function bk() {
  exp = exp.slice(0, -1);
  show();
}

function eq() {
  try {
    exp = "" + Function("return (" + exp + ")")();
  } catch {
    exp = "";
    d.textContent = "Error";
    return;
  }
  show();
}
