let m = 0;
let s = 0;
let ms = 0;
let timer = 0;
const p = (n) => String(n).padStart(2, "0");

function update() {
  document.querySelector(".display").innerHTML = `${p(m)}:${p(s)}:${p(ms)}`;
}
function start() {
  if (timer) return;

  timer = setInterval(() => {
    ms++;
    if (ms === 100) {
      ms = 0;
      s++;
    }
    if (s === 60) {
      s = 0;
      m++;
    }

    update();
  }, 10);
}
function stop() {
  clearInterval(timer);
  timer = 0;

  document.querySelector("#start").innerHTML = "Resume";
}
function reset() {
  stop();
  m = 0;
  s = 0;
  ms = 0;
  update();
  document.querySelector("#start").innerHTML = "Start";
}
update();
