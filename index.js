import { apiKey } from "./config.js"

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector("form .msg");
const list = document.querySelector(".ajax-section .cities");
const li = document.querySelector("li");
const listItems = list.querySelectorAll(".ajax-section .city");
const listItemsArray = Array.from(listItems);

let url;

//formatting form
form.addEventListener("submit", e => {
    e.preventDefault();
    const inputVal = input.value;

    url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    getData();

});

//fetching and displaying data
async function getData() {

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("HTTP-Error: " + response.status);
        }
        const data = await response.json()
        console.log(data)

        if (data && data.name) {

            //create and display a new city container
            const cityContainer = document.createElement("li");
            cityContainer.classList.add("city");
            cityContainer.style.display = "block";

            //format with html
            const { main, name, sys, weather } = data;
            const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

            cityContainer.innerHTML =
                `
        <h2 class="city-name" date-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
        </h2>
        <span class="city-temp">${Math.round(main.temp)}<sup>°C</sup></span>
        <figure>
            <img class="city-icon" src="${icon}" alt="${weather[0]["main"]}">
            <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
        `

            //append the new city container to the list
            list.appendChild(cityContainer);

        }

        //resetting form and input
        msg.textContent = "";
        form.reset();
        input.focus();

    } catch (error) {
        msg.textContent = "Please search for a valid city";
    };
};


