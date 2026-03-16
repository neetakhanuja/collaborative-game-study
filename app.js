const homeScreen = document.getElementById("home-screen");
const probeScreen = document.getElementById("probe-screen");
const languageSelect = document.getElementById("language-select");
const installBtn = document.getElementById("install-btn");

let currentLanguage = localStorage.getItem("app-language") || APP_CONFIG.defaultLanguage;
let currentProbe = null;
let deferredPrompt = null;
let activeAudio = null;

const state = {
  guided: { mapIndex: 0, position: 0, lives: 3, reached: false },
  helping: { round: 0, hintIndex: 0, showExtra: false, revealed: false },
  door: { selected: null, scenarioIndex: 0, result: null },
  song: { round: 0, selected: [], result: null, shuffled: [] }
};

function t(path) {
  const parts = path.split(".");
  let value = UI_TEXT[currentLanguage];
  for (const part of parts) value = value?.[part];
  return value ?? path;
}

function localized(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[currentLanguage] ?? value.gu ?? value.hi ?? value.en ?? "";
  }
  return value;
}

function saveLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem("app-language", lang);
  document.documentElement.lang = lang;
}

function shuffleArrayStable(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderAppChrome() {
  document.title = t("appTitle");
  document.getElementById("app-title").textContent = t("appTitle");
  document.getElementById("app-subtitle").textContent = t("appSubtitle");
  document.getElementById("language-label").textContent = t("languageLabel");
  installBtn.textContent = t("installApp");
  languageSelect.value = currentLanguage;
}

function renderHome() {
  homeScreen.classList.remove("hidden");
  probeScreen.classList.add("hidden");

  const cards = ["guided", "helping", "door", "song"].map((key) => {
    const card = UI_TEXT[currentLanguage].homeCards[key];
    return `
      <div class="card probe-card">
        <div>
          <h3>${card.title}</h3>
          <p>${card.desc}</p>
        </div>
        <button type="button" onclick="openProbe('${key}')">${card.cta}</button>
      </div>
    `;
  }).join("");

  homeScreen.innerHTML = `
    <div class="card">
      <h2 class="screen-title">${t("homeTitle")}</h2>
      <p class="screen-text">${t("homeText")}</p>
      <div class="grid">${cards}</div>
    </div>
  `;
}

function openProbe(type) {
  currentProbe = type;
  homeScreen.classList.add("hidden");
  probeScreen.classList.remove("hidden");

  if (type === "guided") initGuided();
  if (type === "helping") initHelping();
  if (type === "door") initDoor();
  if (type === "song") initSong();
}

function backHome() {
  stopAudio();
  currentProbe = null;
  probeScreen.innerHTML = "";
  renderHome();
}

function rerenderCurrentView() {
  renderAppChrome();
  if (!currentProbe) {
    renderHome();
    return;
  }
  if (currentProbe === "guided") renderGuided();
  if (currentProbe === "helping") renderHelping();
  if (currentProbe === "door") renderDoor();
  if (currentProbe === "song") renderSong();
}

/* Guided Path */

function initGuided() {
  const map = PROBE_CONTENT.guidedMaps[0];
  state.guided = { mapIndex: 0, position: map.playerStart, lives: 3, reached: false };
  renderGuided();
}

function resetGuided() {
  const map = PROBE_CONTENT.guidedMaps[state.guided.mapIndex];
  state.guided.position = map.playerStart;
  state.guided.lives = 3;
  state.guided.reached = false;
  renderGuided();
}

function nextGuidedRound() {
  const nextIndex = Math.min(state.guided.mapIndex + 1, PROBE_CONTENT.guidedMaps.length - 1);
  const map = PROBE_CONTENT.guidedMaps[nextIndex];
  state.guided = { mapIndex: nextIndex, position: map.playerStart, lives: 3, reached: false };
  renderGuided();
}

function moveGuided(dir) {
  if (state.guided.reached || state.guided.lives <= 0) return;

  const map = PROBE_CONTENT.guidedMaps[state.guided.mapIndex];
  const pos = state.guided.position;
  let row = Math.floor(pos / 5);
  let col = pos % 5;

  if (dir === "up" && row > 0) row -= 1;
  if (dir === "down" && row < 4) row += 1;
  if (dir === "left" && col > 0) col -= 1;
  if (dir === "right" && col < 4) col += 1;

  const next = row * 5 + col;
  state.guided.position = next;

  if (map.obstacles.includes(next)) {
    state.guided.lives = Math.max(0, state.guided.lives - 1);
  }

  if (next === map.goal) {
    state.guided.reached = true;
  }

  renderGuided();
}

function renderGuided() {
  const g = state.guided;
  const map = PROBE_CONTENT.guidedMaps[g.mapIndex];

  const cells = Array.from({ length: 25 }, (_, i) => {
    let content = "";
    let cls = "cell";

    if (map.landmarks[i]) content = map.landmarks[i];

    if (map.obstacles.includes(i)) {
      content = "🪨";
      cls += " obstacle";
    }

    if (i === g.position) {
      content = "🚶";
      cls += " player";
    }

    return `<div class="${cls}">${content}</div>`;
  }).join("");

  const hearts = Array.from({ length: 3 }, (_, i) => (
    i < g.lives ? "❤️" : "🖤"
  )).map(h => `<span class="heart">${h}</span>`).join("");

  const showSwitchRoles = g.reached && g.mapIndex < PROBE_CONTENT.guidedMaps.length - 1;
  const showDone = g.reached && g.mapIndex === PROBE_CONTENT.guidedMaps.length - 1;

  probeScreen.innerHTML = `
    <div class="nav-top">
      <h2 class="screen-title">${t("guided.title")}</h2>
      <button class="secondary" type="button" onclick="backHome()">${t("common.home")}</button>
    </div>

    <p class="screen-text">${t("guided.text")}</p>

    <div class="guided-layout">
      <div class="map-box">
        <div class="status-row">
          <strong>${localized(map.title)}</strong>
          <div class="lives"><span>${t("common.lives")}:</span> ${hearts}</div>
        </div>

        <div class="maze-grid">${cells}</div>

        ${g.reached ? `<div class="result good">${t("guided.reached")}</div>` : ""}
        ${g.lives <= 0 ? `<div class="result bad">${t("guided.lost")}</div>` : ""}
      </div>

      <div class="arrow-panel">
        <div class="top-note">${t("guided.moveHere")}</div>
        <div class="arrow-grid">
          <div class="spacer">.</div>
          <button type="button" onclick="moveGuided('up')">⬆</button>
          <div class="spacer">.</div>

          <button type="button" onclick="moveGuided('left')">⬅</button>
          <button class="secondary" type="button" onclick="resetGuided()">⟲</button>
          <button type="button" onclick="moveGuided('right')">➡</button>

          <div class="spacer">.</div>
          <button type="button" onclick="moveGuided('down')">⬇</button>
          <div class="spacer">.</div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button class="secondary" type="button" onclick="resetGuided()">${t("common.reset")}</button>
      ${showSwitchRoles ? `<button type="button" onclick="nextGuidedRound()">${t("common.switchRoles")}</button>` : ""}
      ${showDone ? `<button type="button" onclick="backHome()">${t("common.done")}</button>` : ""}
    </div>
  `;
}

/* Helping Without Reward */

function initHelping() {
  state.helping = { round: 0, hintIndex: 0, showExtra: false, revealed: false };
  renderHelping();
}

function nextHint() {
  const round = PROBE_CONTENT.helping.rounds[state.helping.round];
  const hints = localized(round.hints);
  if (state.helping.hintIndex < hints.length - 1) {
    state.helping.hintIndex += 1;
  }
  state.helping.showExtra = false;
  renderHelping();
}

function toggleHelp() {
  state.helping.showExtra = !state.helping.showExtra;
  renderHelping();
}

function showAnswer() {
  state.helping.revealed = true;
  renderHelping();
}

function nextHelpingRound() {
  state.helping = {
    round: (state.helping.round + 1) % PROBE_CONTENT.helping.rounds.length,
    hintIndex: 0,
    showExtra: false,
    revealed: false
  };
  renderHelping();
}

function renderHelping() {
  const h = state.helping;
  const round = PROBE_CONTENT.helping.rounds[h.round];
  const hints = localized(round.hints);
  const currentHint = hints[h.hintIndex];
  const hintsFinished = h.hintIndex >= hints.length - 1;

  probeScreen.innerHTML = `
    <div class="nav-top">
      <h2 class="screen-title">${t("helping.title")}</h2>
      <button class="secondary" type="button" onclick="backHome()">${t("common.home")}</button>
    </div>

    <p class="screen-text">${t("helping.text")}</p>

    <div class="option">
      <strong>${t("helping.hintLabel")} ${h.hintIndex + 1}</strong>
      <p style="font-size: 32px;">${currentHint}</p>
    </div>

    ${h.showExtra ? `
      <div class="option">
        <strong>${t("helping.helperLabel")}</strong>
        <p>${t("helping.helperText")}</p>
      </div>
    ` : ""}

    ${h.revealed ? `
      <div class="result good">${t("helping.answerLabel")}: ${localized(round.movie)}</div>
    ` : ""}

    <div class="controls">
      ${!hintsFinished ? `<button type="button" onclick="nextHint()">${t("common.nextHint")}</button>` : ""}
      <button class="secondary" type="button" onclick="toggleHelp()">${t("common.help")}</button>
      <button class="secondary" type="button" onclick="nextHelpingRound()">${t("common.nextRound")}</button>
    </div>

    ${hintsFinished && !h.revealed ? `
      <div class="option" style="margin-top:18px; border-style:dashed;">
        <strong>${t("helping.revealPrompt")}</strong>
        <div class="controls" style="margin-top:12px;">
          <button type="button" onclick="showAnswer()">${t("common.showAnswer")}</button>
        </div>
      </div>
    ` : ""}
  `;
}

/* Door Decision */

function initDoor() {
  state.door = { selected: null, scenarioIndex: 0, result: null };
  renderDoor();
}

function selectDoor(choice) {
  state.door.selected = choice;
  state.door.result = null;
  renderDoor();
}

function submitDoor() {
  const d = state.door;
  const scenario = PROBE_CONTENT.door.scenarios[d.scenarioIndex];
  if (!d.selected) return;
  d.result = d.selected === scenario.correct ? "correct" : "wrong";
  renderDoor();
}

function nextDoorScenario() {
  state.door = {
    scenarioIndex: (state.door.scenarioIndex + 1) % PROBE_CONTENT.door.scenarios.length,
    selected: null,
    result: null
  };
  renderDoor();
}

function doorResultText() {
  if (state.door.result === "correct") {
    return `<div class="result good">${t("door.success")}</div>`;
  }
  if (state.door.result === "wrong") {
    return `<div class="result bad">${t("door.fail")}</div>`;
  }
  return "";
}

function renderDoor() {
  const d = state.door;
  const scenario = PROBE_CONTENT.door.scenarios[d.scenarioIndex];

  const leftClass = ["door"];
  const rightClass = ["door"];

  if (d.selected === "A") leftClass.push("selected");
  if (d.selected === "B") rightClass.push("selected");
  if (d.result === "correct" && scenario.correct === "A") leftClass.push("correct-win");
  if (d.result === "correct" && scenario.correct === "B") rightClass.push("correct-win");
  if (d.result === "wrong" && d.selected === "A") leftClass.push("wrong-shake");
  if (d.result === "wrong" && d.selected === "B") rightClass.push("wrong-shake");

  probeScreen.innerHTML = `
    <div class="nav-top">
      <h2 class="screen-title">${t("door.title")}</h2>
      <button class="secondary" type="button" onclick="backHome()">${t("common.home")}</button>
    </div>

    <p class="screen-text">${t("door.text")}</p>

    <div class="option">
      <strong>${t("door.clueLabel")}</strong>
      <p style="font-size: 34px;">${localized(scenario.clue)}</p>
    </div>

    <div class="door-row">
      <div class="${leftClass.join(" ")}" onclick="selectDoor('A')">
        <div class="door-illus ${scenario.left.style}">${scenario.left.visual}</div>
        <div>${localized(scenario.left.label)}</div>
      </div>

      <div class="${rightClass.join(" ")}" onclick="selectDoor('B')">
        <div class="door-illus ${scenario.right.style}">${scenario.right.visual}</div>
        <div>${localized(scenario.right.label)}</div>
      </div>
    </div>

    <div class="controls">
      <button type="button" onclick="submitDoor()">${t("common.openDoor")}</button>
      <button class="secondary" type="button" onclick="nextDoorScenario()">${t("common.nextClue")}</button>
    </div>

    <div>${doorResultText()}</div>
  `;
}

/* Song Completion */

function initSong() {
  state.song = { round: 0, selected: [], result: null, shuffled: [] };
  prepareSongRound();
  renderSong();
}

function prepareSongRound() {
  const round = PROBE_CONTENT.song.rounds[state.song.round];
  const mapped = round.options.map((opt, index) => ({
    index,
    text: localized(opt.text)
  }));
  state.song.shuffled = shuffleArrayStable(mapped);
}

function pickLyric(index) {
  const round = PROBE_CONTENT.song.rounds[state.song.round];
  if (!state.song.selected.includes(index) && state.song.selected.length < round.options.length) {
    state.song.selected.push(index);
    state.song.result = null;
    renderSong();
  }
}

function resetSong() {
  stopAudio();
  state.song.selected = [];
  state.song.result = null;
  renderSong();
}

function nextSong() {
  stopAudio();
  state.song.round = (state.song.round + 1) % PROBE_CONTENT.song.rounds.length;
  state.song.selected = [];
  state.song.result = null;
  prepareSongRound();
  renderSong();
}

function stopAudio() {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
}

function checkSong() {
  const round = PROBE_CONTENT.song.rounds[state.song.round];
  const correctOrder = round.options.map((_, i) => i);
  const correct = JSON.stringify(state.song.selected) === JSON.stringify(correctOrder);

  state.song.result = correct ? "correct" : "wrong";

  if (correct && round.audio) {
    stopAudio();
    activeAudio = new Audio(round.audio);
    activeAudio.play().catch(() => {});
  }

  renderSong();
}

function songResultText() {
  const round = PROBE_CONTENT.song.rounds[state.song.round];

  if (state.song.result === "correct") {
    return `
      <div class="result good">${t("song.success")}</div>
      <div class="option audio-wrap" style="margin-top:14px;">
        <audio controls autoplay preload="auto">
          <source src="${round.audio}" type="audio/mpeg">
        </audio>
      </div>
    `;
  }

  if (state.song.result === "wrong") {
    return `<div class="result bad">${t("song.fail")}</div>`;
  }

  return "";
}

function renderSong() {
  const s = state.song;
  const round = PROBE_CONTENT.song.rounds[s.round];

  const cards = s.shuffled.map(opt => `
    <div class="lyric-card">
      <p>${opt.text}</p>
      <button class="large-btn secondary" type="button" onclick="pickLyric(${opt.index})">
        ${t("common.select")}
      </button>
    </div>
  `).join("");

  const selectedMarkup = s.selected.length
    ? `
      <div class="selected-sequence">
        ${s.selected.map(i => `<span class="sequence-chip">${localized(round.options[i].text)}</span>`).join("")}
      </div>
    `
    : `<p>${t("song.emptySelection")}</p>`;

  probeScreen.innerHTML = `
    <div class="nav-top">
      <h2 class="screen-title">${t("song.title")}</h2>
      <button class="secondary" type="button" onclick="backHome()">${t("common.home")}</button>
    </div>

    <p class="screen-text">${t("song.text")}</p>

    <div class="option">
      <strong>${t("song.prompt")}</strong>
      <p style="font-size:36px;">${localized(round.line)}</p>
    </div>

    <div class="lyric-cards">${cards}</div>

    <div class="option">
      <strong>${t("song.yourOrder")}</strong>
      ${selectedMarkup}
    </div>

    <div class="controls">
      <button type="button" onclick="checkSong()">${t("common.checkOrder")}</button>
      <button class="secondary" type="button" onclick="resetSong()">${t("common.tryAgain")}</button>
      <button class="secondary" type="button" onclick="nextSong()">${t("common.nextSong")}</button>
    </div>

    <div>${songResultText()}</div>
  `;
}

/* PWA */

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch((err) => {
        console.error("Service worker registration failed:", err);
      });
    });
  }
}

function setupInstallPrompt() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.remove("hidden");
  });

  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.classList.add("hidden");
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    installBtn.classList.add("hidden");
  });
}

function bindEvents() {
  languageSelect.addEventListener("change", (e) => {
    saveLanguage(e.target.value);
    rerenderCurrentView();
  });
}

function initApp() {
  saveLanguage(currentLanguage);
  renderAppChrome();
  renderHome();
  bindEvents();
  setupInstallPrompt();
  registerServiceWorker();
}

window.openProbe = openProbe;
window.backHome = backHome;
window.moveGuided = moveGuided;
window.resetGuided = resetGuided;
window.nextGuidedRound = nextGuidedRound;
window.nextHint = nextHint;
window.toggleHelp = toggleHelp;
window.showAnswer = showAnswer;
window.nextHelpingRound = nextHelpingRound;
window.selectDoor = selectDoor;
window.submitDoor = submitDoor;
window.nextDoorScenario = nextDoorScenario;
window.pickLyric = pickLyric;
window.checkSong = checkSong;
window.resetSong = resetSong;
window.nextSong = nextSong;

initApp();