const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const resultContainer = document.getElementById("result-container");
const typesP = document.getElementById("types");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById("height");
const creatureTypes = document.getElementById("types");
const creatureHp = document.getElementById("hp");
const creatureAttack = document.getElementById("attack");
const creatureDefense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const creatureSpeed = document.getElementById("speed");

const creaturesDataUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const xUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

let creatures = [
  {
    "id": 1,
    "name": "Pyrolynx"
  },
  {
    "id": 2,
    "name": "Aquoroc"
  },
  {
    "id": 3,
    "name": "Voltadon"
  },
  {
    "id": 4,
    "name": "Floraspine"
  },
  {
    "id": 5,
    "name": "Cryostag"
  },
  {
    "id": 6,
    "name": "Terradon"
  },
  {
    "id": 7,
    "name": "Emberapod"
  },
  {
    "id": 8,
    "name": "Lunaclaw"
  },
  {
    "id": 9,
    "name": "Quillquake"
  },
  {
    "id": 10,
    "name": "Mystifin"
  },
  {
    "id": 11,
    "name": "Dracilume"
  },
  {
    "id": 12,
    "name": "Thornaconda"
  },
  {
    "id": 13,
    "name": "Frostbyte"
  },
  {
    "id": 14,
    "name": "Graviboa"
  },
  {
    "id": 15,
    "name": "Zephyreon"
  },
  {
    "id": 16,
    "name": "Blazebore"
  },
  {
    "id": 17,
    "name": "Brontogale"
  },
  {
    "id": 18,
    "name": "Shadeelisk"
  },
  {
    "id": 19,
    "name": "Titanule"
  },
  {
    "id": 20,
    "name": "Faegis"
  }
];

const capitalize = (str) => {
    const strArr = str.split("");
    const first = strArr[0];
    strArr.shift();
    const rest = strArr.join("");
    return first.toUpperCase() + rest.toLowerCase();
}

const isValidInput = (input) => {
  const creature = creatures.find((item) => input === item.id || input === item.name);
  if (creature) {
    return true;
  }
    return false;
}

const fetchData = async (nameOrId) => {
    try {
        // create url for creature and fetch data
        const creatureUrl = `${xUrl}${nameOrId}`;
        const response = await fetch(creatureUrl);
        const data = await response.json();
        const { id, name, weight, height, special, stats, types } = data;

        // display data
        creatureId.textContent = id;
        creatureName.textContent = name;
        creatureWeight.textContent = weight;
        creatureHeight.textContent = height;
          // reset types
        creatureTypes.innerHTML = "Types: ";
        creatureTypes.innerHTML += types.map((item, index) => {
            if (index === types.length - 1) {
                // don't add comma
                return `<span class="name">${item.name}</span>`;
            }
            return `<span class="name">${item.name}</span>, `;
        }).join("");
        creatureHp.textContent = stats[0]["base_stat"];
        creatureAttack.textContent = stats[1]["base_stat"];
        creatureDefense.textContent = stats[2]["base_stat"];
        specialAttack.textContent = stats[3]["base_stat"];
        specialDefense.textContent = stats[4]["base_stat"];
        creatureSpeed.textContent = stats[5]["base_stat"];

        resultContainer.classList.remove("hide");

        // reset input
        searchInput.value = "";
        searchInput.focus();
    } catch (err) {
        alert("Creature not found");
    }
}

searchBtn.addEventListener("click", () => {
  fetchData(capitalize(searchInput.value));
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        fetchData(capitalize(searchInput.value));
    }
});