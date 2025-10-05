<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Rialo AI Defense Game</title>
<style>
body {
    background: #f0f0f0;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    text-align: center;
}
#gameCanvas {
    background: #fff;
    display: block;
    margin: 20px auto;
    border: 2px solid #000;
}
h1 {
    margin-top: 10px;
}
</style>
</head>
<body>
<h1>Rialo AI Defense</h1>
<canvas id="gameCanvas" width="500" height="700"></canvas>
<script>
// JavaScript code here

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const jet = { x: 225, y: 620, width: 50, height: 50, speed: 8, color: '#0366d6' };
let bullets = [];
let enemies = [];
let keys = {};
let score = 0;
let frameCount = 0;

let alphaBot = null;
let bossActive = false;
let bossHP = 6;
const rialoQuestions = [
  { q: "What is Rialo's tagline?", a: "Rethink. Rebuild. Rialo." },
  { q: "Is Rialo a layer one blockchain? (yes/no)", a: "no" },
  { q: "What language/tools does Rialo make compatible?", a: "Solana VM" },
  { q: "Name one benefit of Rialo's real-world data feeds.", a: "Real-time reactions" },
  { q: "Which architecture does Rialo add for speed?", a: "RISC-V" }
];

document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

function shoot() {
  bullets.push({ x: jet.x + jet.width/2 - 5, y: jet.y, width: 10, height: 20, speed: 14 });
}

function spawnEnemy() {
  if (frameCount % 40 === 0 && score < 10) {
    enemies.push({ x: Math.random()*455, y: -40, width: 45, height: 45, speed: 3 + Math.random()*2 });
  }
}

function askRialoQuestion() {
  const q = rialoQuestions[Math.floor(Math.random() * rialoQuestions.length)];
  setTimeout(() => {
    const ans = prompt(AlphaBot Attack!
${q.q});
    if (ans && ans.trim().toLowerCase() === q.a.toLowerCase()) {
      bossHP--;
      alert(Correct! Shields left: ${bossHP});
      if (bossHP <= 0) {
        alert('AlphaBot defeated! You saved Rialo!');
        document.location.reload();
      }
    } else {
      alert('Wrong! Game over.');
      document.location.reload();
    }
  }, 150);
}

function update() {
  if (keys['ArrowLeft'] && jet.x > 0) jet.x -= jet.speed;
  if (keys['ArrowRight'] && jet.x < 450) jet.x += jet.speed;
  if (keys['ArrowUp'] && jet.y > 0) jet.y -= jet.speed;
  if (keys['ArrowDown'] && jet.y < 650) jet.y += jet.speed;
  if (keys[' '] && frameCount % 8 === 0) shoot();

  bullets = bullets.filter(b => b.y > -b.height);
  bullets.forEach(b => b.y -= b.speed);
  spawnEnemy();
  enemies.forEach(e => e.y += e.speed);
  enemies = enemies.filter(e => e.y < 720);

  // Bullet-enemy collision
  bullets.forEach((b, bi) => {
    enemies.forEach((e, ei) => {
      if (b.x < e.x + e.width && b.x + b.width > e.x && b.y < e.y + e.height && b.y + b.height > e.y) {
        enemies.splice(ei,1);
        bullets.splice(bi,1);
        score++;
      }
    });
  });

  // Enemy-jet collision
  for (let e of enemies) {
    if (jet.x < e.x + e.width && jet.x + jet.width > e.x && jet.y < e.y + e.height && jet.y + jet.height > e.y) {
      alert('Game Over! Score: ' + score);
      document.location.reload();
    }
  }

  // Spawn AlphaBot at score 10
  if (score >= 10 && !bossActive) {
    alphaBot = { x: 225, y: 10, width: 70, height: 70, dx: 3 };
    bossActive = true;
    bossHP = 6;
  }
  if (bossActive && alphaBot) {
    alphaBot.x += alphaBot.dx;
    if (alphaBot.x < 0 || alphaBot.x > 430) alphaBot.dx = -alphaBot.dx;
    // Check bullets hit AlphaBot
    bullets.forEach((b, bi) => {
      if (b.x < alphaBot.x + alphaBot.width && b.x + b.width > alphaBot.x && b.y < alphaBot.y + alphaBot.height && b.y + b.height > alphaBot.y) {
        bullets.splice(bi,1);
        askRialoQuestion();
