const newGameForm = document.getElementById("new-game");
const playerCount = document.getElementById("player-count");
const mainDiv = document.getElementById("main-div");


//// NEW GAME FUNCTIONS ////

//If valid player count, calls on newGameFetch
function startNewGame() {
  event.preventDefault();
  let players = playerCount.value
  if (players) {
    newGameFetch(players);
  }
}

//Creates a new game in database
function newGameFetch(players) {
  // fetch("http://localhost:3000/api/v1/games", newGameObj())
  //   .then(res => res.json())
  //   .then(res => newGame(players))
  //   .catch(errors => errors.messages)
  newGame(players);
}

//New game object for post request
function newGameObj() {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      complete: false,
      winner: 0
    })
  }
}

function newGame(players) {
  mainDiv.innerHTML = `
    <h1>Players ${players}</h1>
    <div id="players-div"></div>
    <h2>Rounds</h2>
  `
  playerForm(players)
}

//// PLAYER FUNCTIONS ////

function playerForm(players) {
  const playersDiv = document.getElementById("players-div");
  let playersString = ""
  for (let i = 0; i < players; i++) {
    playersString += createPlayerDiv()
  }
  playersDiv.innerHTML = playersString;
}

function createPlayerDiv() {
  return `
    <form>
      <select>
        <option value="" disabled selected>Choose Player</option>
        <option value="Nick">Nick</option>
        <option value="Dave">Dave</option>
        <option value="Robert">Robert</option>
        <option value="Grace">Grace</option>
        <option value="Jodi">Jodi</option>
        <option value="Sarah">Sarah</option>
        <option value="Add New Player">New Player</option>
      </select>
      <button type="submit">Submit Player</button>
    </form>
  `
}












//// EVENT LISTENTERS ////
newGameForm.addEventListener("submit", startNewGame)
