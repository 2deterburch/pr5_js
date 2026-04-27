"use strict";

console.log("Підключено JavaScript для Практичної роботи №5");

// ===== Завдання 2: Fetch API через .then() =====

fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => console.log("Дані через then:", data))
    .catch(error => console.error("Error fetching data:", error));


// ===== Завдання 2: async/await + try/catch =====

async function loadData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        const data = await response.json();
        console.log("Дані через async/await:", data);

    } catch (error) {
        console.error("Error:", error);
    }
}

loadData();


// ===== Завдання 3: Завантаження користувачів у <pre> =====

const loadUsersButton = document.getElementById("loadUsers");
const usersOutput = document.getElementById("usersOutput");

loadUsersButton.addEventListener("click", loadUsers);

async function loadUsers() {
    try {
        usersOutput.textContent = "Завантаження...";

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        const users = await response.json();

        usersOutput.textContent = JSON.stringify(users, null, 2);

        console.log("Користувачі завантажені:", users);

    } catch (error) {
        usersOutput.textContent = "Помилка завантаження даних.";
        console.error("Помилка:", error);
    }
}


// ===== Завдання 4: PokeAPI =====

const pokemonButton = document.getElementById("loadPokemon");
const pokemonOutput = document.getElementById("pokemonOutput");

pokemonButton.addEventListener("click", loadPokemon);

async function loadPokemon() {
    try {
        pokemonOutput.textContent = "";

        const input = prompt("Введіть ім'я або ID покемона:");

        if (!input) {
            pokemonOutput.textContent = "Ви нічого не ввели.";
            return;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`);

        if (!response.ok) {
            throw new Error("Покемона не знайдено");
        }

        const data = await response.json();

        console.log("Дані покемона:", data);

        displayPokemon(data);

    } catch (error) {
        pokemonOutput.textContent = "Помилка: покемона не знайдено.";
        console.error("Помилка:", error);
    }
}

function displayPokemon(data) {
    const { name, stats, types, sprites } = data;

    document.getElementById("name").textContent = name;
    document.getElementById("pokemonImg").src = sprites.front_default;

    document.getElementById("hp").textContent = "HP " + stats[0].base_stat;
    document.getElementById("attack").textContent = stats[1].base_stat;
    document.getElementById("defense").textContent = stats[2].base_stat;
    document.getElementById("speed").textContent = stats[5].base_stat;

    const typesContainer = document.getElementById("types");
    typesContainer.innerHTML = "";

    types.forEach(item => {
        const span = document.createElement("span");
        span.textContent = item.type.name;
        typesContainer.appendChild(span);
    });
}
