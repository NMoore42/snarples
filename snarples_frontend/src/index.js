const newGameForm = document.getElementById("new-game");
const playerCount = document.getElementById("player-count");
const mainDiv = document.getElementById("main-div");


//// NEW GAME FUNCTIONS ////

//If valid player count, calls on createNewGameInstance
function startNewGame() {
  event.preventDefault();
  let players = playerCount.value
  if (players) {
    createNewGameInstance(players);
  }
}

//Creates a new game in database
function createNewGameInstance(players) {
  fetch("http://localhost:3000/api/v1/games", newGameObj())
    .then(res => res.json())
    .then(res => newGame(players))
    .catch(errors => errors.messages)
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
      completed: false,
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

//Appends player name forms to page
function playerForm(players) {
  const playersDiv = document.getElementById("players-div");
  let playersString = ""
  for (let i = 0; i < players; i++) {
    playersString += createPlayerDiv()
  }
  playersDiv.innerHTML = playersString;
}

//Creates a player name form for each player in new game
function createPlayerDiv() {
  return `
    <div>
      <form data-form="form">
        <select data-name="name">
          <option value="" disabled selected>Choose Player</option>
          <option value="Nick">Nick</option>
          <option value="Dave">Dave</option>
          <option value="Robert">Robert</option>
          <option value="Grace">Grace</option>
          <option value="Jodi">Jodi</option>
          <option value="Sarah">Sarah</option>
          <option value="New Player">New Player</option>
        </select>
        <button type="submit">Submit Player</button>
      </form>
    </div>
  `
}

//Handles player name fields.  If new player needs to be added to db, inserts text field.
function newPlayerNameHandler() {
  let clicked = event.target;
  if (clicked.dataset.name === "name") {
    if (clicked.value === "New Player") {
      let nameField = document.createElement("input");
      nameField.type = "text";
      nameField.placeholder = "New Name"
      clicked.parentNode.insertBefore(nameField, clicked.nextSibling)
    } else {
      if (clicked.nextSibling.tagName === "INPUT") {
        clicked.nextSibling.remove();
      }
    }
  }
}

//Fetch call to create a new player instance
function createNewPlayerInstance(name) {
  fetch("http://localhost:3000/api/v1/players", newPlayerObj(name))
    .then(res => res.json())
    //.then(res => newGame(players))
    .catch(errors => errors.messages)
  }

  //New game object for post request
  function newPlayerObj(name) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      games_won: 0,
      games_played: 0
    })
  }
}


//// HAND FUNCTIONS ////

//Handles bubbling for submitting a player name
function createInitialHandHandler() {
  event.preventDefault();
  let clicked = event.target;
  if (clicked.dataset.form === "form") {
    console.log("hi")
    determineNewPlayer(clicked);
  }
}

//Creates initial hand for player.  If player instance doesn't exists, invokes function to create new player.
function determineNewPlayer(clicked) {
  let select = clicked.firstElementChild;
  let p = document.createElement("p");
  if (select.value === "New Player") {
    let name = select.nextElementSibling.value
    p.innerHTML = name + " is in the game!"
    //Create new player instance
    //createNewPlayerInstance(select.nextElementSibling.value)
    clicked.parentElement.innerHTML = p.outerHTML;
    //Then create new hand instance
  } else {
    let name = clicked.firstElementChild.value
    p.innerHTML = name + " is in the game!"
    clicked.parentElement.innerHTML = p.outerHTML;
    //Create new hand instance
  }
}









//// EVENT LISTENTERS ////
newGameForm.addEventListener("submit", startNewGame)
mainDiv.addEventListener("change", newPlayerNameHandler)
mainDiv.addEventListener("submit", createInitialHandHandler)
