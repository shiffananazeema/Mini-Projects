function startTime() {
  const t = new Date();
  const p = (n) => String(n).padStart(2, "0");
  const ampm = t.getHours() >= 12 ? "PM" : "AM";

  let h = t.getHours();
  h = h % 12 || 12;

  let m = t.getMinutes();
  let s = t.getSeconds();

  document.querySelector("h1").innerHTML = `${p(h)}:${p(m)}:${p(s)} ${ampm}`;

  setTimeout(startTime, 1000);
}
startTime();
