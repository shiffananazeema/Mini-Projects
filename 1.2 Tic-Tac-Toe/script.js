const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let p = Array(9).fill(" "),
  turn = "X",
  over = false;

const b = document.getElementById("b"),
  o = document.getElementById("o"),
  t = document.getElementById("t");

function w() {
  for (const [a, b, c] of wins)
    if (p[a] != " " && p[a] == p[b] && p[b] == p[c]) return p[a];
  return null;
}

function show(msg) {
  t.textContent = msg;
  o.classList.add("show");
}

function reset() {
  p.fill(" ");
  turn = "X";
  over = false;
  o.classList.remove("show");
  [...b.children].forEach((c) => {
    c.textContent = "";
    c.classList.remove("filled");
  });
}

for (let i = 0; i < 9; i++) {
  const c = document.createElement("button");
  c.className = "cell";
  c.dataset.i = i;
  c.onclick = () => {
    if (over || p[i] != " ") return;
    p[i] = turn;
    c.textContent = turn;
    c.classList.add("filled");

    const win = w();
    if (win) {
      over = true;
      show(win + " wins!");
    } else if (!p.includes(" ")) {
      over = true;
      show("Tie!");
    } else turn = turn == "X" ? "O" : "X";
  };
  b.appendChild(c);
}

document.getElementById("r").onclick = reset;
document.getElementById("p").onclick = reset;
reset();
