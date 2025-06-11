const canvas = document.getElementById("rdiuCanvas");
const ctx = canvas.getContext("2d");
const scrollbar = document.getElementById("scrollbar");
const thumb = document.getElementById("scrollbar-thumb");

let scrollY = 0;
let maxScroll = 0;
let isDragging = false;
let dragStartY = 0;
let thumbStartTop = 0;

const scrollbarWidth = scrollbar.offsetWidth;

const generalInfo = 
`R.D.I.U. - Robloxian Defense & Intelligence Unit

We are a covert agency tasked with securing Robloxia from internal and external threats. 
Our mission includes containment, intelligence, and advanced tech development.

Containment Classes:
A - Minimal Threat
  Entities with very low risk, cooperative and harmless. Minimal containment needed.

B - Low Threat
  Slightly more risky, but manageable with standard security.

C - Moderate Threat
  Entities with some dangerous tendencies, require controlled containment.

D - Elevated Threat
  More aggressive or unpredictable entities, need enhanced security measures.

E - Significant Threat
  Entities that have shown hostile behavior; strict containment needed.

F - High Threat
  Frequently aggressive, capable of harm; constant monitoring required.

G - Very High Threat
  Dangerous and volatile entities; enhanced protocols enforced.

X - Extreme Threat
  Unpredictable powers, prone to violent outbreaks, require max security.

Y - Severe Threat
  Near impossible to contain, require specialized protocols and resources.

Z - Maximum Threat
  Most dangerous entities known; maximum security, often special containment materials or cells.

---
`;

const logs = [
  {
    text: "Entity #002 & #003 - c00lkidd & bluudud",
    x: 40,
    y: 470,
    info: `Entities: c00lkidd & bluudud
Threat Level: B
Status: Contained Together
Privileges: Family visits, parties allowed
Containment Cost: $500
Notes:
Both are mildly dangerous but manageable. c00lkidd is compliant and social, bluudud is noisy but not highly threatening. Shared cell due to compatibility.`
  },
  {
    text: "Entity #004 - jason",
    x: 40,
    y: 510,
    info: `Entity: jason
Threat Level: A
Status: Contained
Security Breach Count: 6
Notes:
Jason has escaped multiple times, forcing reviews and firings. Containment measures are increasing.`
  },
  {
    text: "Entity #005 - john doe",
    x: 40,
    y: 550,
    info: `Entity: john doe
Threat Level: Z
Status: Contained in Pure Tungsten Cell
Notes:
John doe is extremely powerful and breaks out often. Despite containment in a tungsten cell, he remains a maximum threat.`
  },
  {
    text: "Entity #006 - pedro.exe",
    x: 40,
    y: 590,
    info: `Entity: pedro.exe
Threat Level: D
Status: Contained
Notes:
Pedro.exe shows erratic digital behavior and occasional aggression. Containment protocols are strictly enforced.`
  },
  {
    text: "Entity #007 - forsaken upcoming 1",
    x: 40,
    y: 630,
    info: `Entity: forsaken upcoming 1
Threat Level: E
Status: Contained
Notes:
Details classified. Known for hostile tendencies and resistance to containment.`
  },
  {
    text: "Entity #008 - forsaken upcoming 2",
    x: 40,
    y: 670,
    info: `Entity: forsaken upcoming 2
Threat Level: F
Status: Contained
Notes:
High threat level, requires constant monitoring and advanced containment methods.`
  }
];

let popup = null;
const contentHeight = 720;

function resize() {
  canvas.width = window.innerWidth - scrollbarWidth;
  canvas.height = window.innerHeight;
  maxScroll = Math.max(0, contentHeight - canvas.height);
  updateThumbHeight();
  if (scrollY > maxScroll) scrollY = maxScroll;
  drawUI();
}
window.addEventListener("resize", resize);

function drawUI() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.clip();

  ctx.translate(0, -scrollY);

  ctx.fillStyle = "white";
  ctx.font = "16px monospace";
  const lines = generalInfo.split("\n");
  lines.forEach((line, i) => {
    ctx.fillText(line, 40, 40 + i * 22);
  });

  ctx.fillStyle = "teal";
  ctx.font = "28px monospace";
  ctx.fillText("R.D.I.U. SECURED ENTITIES", 40, 420);

  ctx.font = "18px monospace";
  logs.forEach(log => {
    ctx.fillStyle = "#111";
    ctx.fillRect(log.x - 15, log.y - 25, 700, 35);
    ctx.strokeStyle = "teal";
    ctx.lineWidth = 2;
    ctx.strokeRect(log.x - 15, log.y - 25, 700, 35);
    ctx.fillStyle = "teal";
    ctx.fillText(log.text, log.x, log.y);
  });

  if (popup) {
    drawPopup(popup.text);
  }

  ctx.restore();
}

function drawPopup(text) {
  const lines = text.split("\n");
  const width = 700;
  const height = lines.length * 26 + 50;
  const x = canvas.width / 2 - width / 2;
  const y = canvas.height / 2 - height / 2;

  ctx.fillStyle = "#000";
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = "teal";
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, width, height);

  ctx.fillStyle = "white";
  ctx.font = "18px monospace";
  lines.forEach((line, i) => {
    ctx.fillText(line, x + 20, y + 40 + i * 26);
  });
}

canvas.addEventListener("click", e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  const scrollAdjustedY = my + scrollY;

  popup = null;

  logs.forEach(log => {
    const lx = log.x - 15;
    const ly = log.y - 25;
    const lw = 700;
    const lh = 35;

    if (mx >= lx && mx <= lx + lw && scrollAdjustedY >= ly && scrollAdjustedY <= ly + lh) {
      popup = { text: log.info };
    }
  });

  drawUI();
});

thumb.addEventListener("mousedown", e => {
  isDragging = true;
  dragStartY = e.clientY;
  thumbStartTop = parseInt(window.getComputedStyle(thumb).top) || 0;
  e.preventDefault();
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener("mousemove", e => {
  if (!isDragging) return;
  const delta = e.clientY - dragStartY;
  const maxThumbTop = scrollbar.clientHeight - thumb.clientHeight;
  let newTop = thumbStartTop + delta;
  if (newTop < 0) newTop = 0;
  if (newTop > maxThumbTop) newTop = maxThumbTop;
  thumb.style.top = newTop + "px";

  scrollY = (newTop / maxThumbTop) * maxScroll;
  drawUI();
});

scrollbar.addEventListener("click", e => {
  if (e.target === thumb) return;
  const rect = scrollbar.getBoundingClientRect();
  let clickY = e.clientY - rect.top;
  const maxThumbTop = scrollbar.clientHeight - thumb.clientHeight;
  let newTop = clickY - thumb.clientHeight / 2;
  if (newTop < 0) newTop = 0;
  if (newTop > maxThumbTop) newTop = maxThumbTop;
  thumb.style.top = newTop + "px";

  scrollY = (newTop / maxThumbTop) * maxScroll;
  drawUI();
});

canvas.addEventListener("wheel", e => e.preventDefault(), { passive: false });

function updateThumbHeight() {
  const ratio = canvas.height / contentHeight;
  const newHeight = Math.max(ratio * scrollbar.clientHeight, 30);
  thumb.style.height = newHeight + "px";
}

resize();
