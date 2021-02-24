const api = "ff335b63b21089cf1d9a718b6aa371cb";
// Using Async Function:
const weatherCity = async (city) => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`
  );
  let data = await response.json();
  return data;
};
// // Simple fetch:
// const weatherCity = (city) =>
//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`
//   ).then((response) => response.json());

const createCardHtml = (name, emoji, temp, feelsLike, description, img) =>
  `<div class="card" d-flex mx-auto style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${emoji}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${name}</h6>
      <p class="card-text"> ${temp}c,</br> feels like ${feelsLike},<br>${description}</p>

    </div>
  </div>
  <div class='container pt-3 mx-3 image' style ='height:100px'>
        <img src='${img}'>
        </div>`;
//   `<div class='card'>
//         <div class='row'>
//             <div class='col-2'>
//                 ${emoji}
//             </div>
//             <div class ='col-10'>
//                 <div class='row'>
//                     <div class='col-4'>
//                         ${name}
//                     </div>
//                     <div class='col-6'>
//                     ${temp}c, feels like ${feelsLike}
//                     </div>
//                 </div>
//                 <div class='row'>
//                     ${description}
//                 </div>
//             </div>
//         </div>
//     </div> `;

const emojis = {
  "01d": "☀️",
  "02d": "⛅️",
  "03d": "☁️",
  "04d": "☁️",
  "09d": "🌧",
  "10d": "🌦",
  "11d": "⛈",
  "13d": "❄️",
  "50d": "💨",
  "01n": "☀️",
  "02n": "⛅️",
  "03n": "☁️",
  "04n": "☁️",
  "09n": "🌧",
  "10n": "🌦",
  "11n": "⛈",
  "13n": "❄️",
  "50n": "💨",
};

const searchButton = document.querySelector("#submitButton");
const weatherCard = document.querySelector("#weatherCard");
const cityValue = document.querySelector("#cityValue");

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const city = cityValue.value;

  weatherCity(city).then((data) => {
    const name = data.name;
    try {
      const emoji = emojis[data.weather[0].icon];
      const temp = data.main.temp;
      const feelsLike = data.main.feels_like;
      const description = data.weather[0].description;
      let img;
      if (description == "rain") {
        img =
          "https://images.unsplash.com/photo-1428592953211-077101b2021b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cmFpbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=60";
      } else if (description == "snow") {
        img =
          "https://images.unsplash.com/photo-1457269449834-928af64c684d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fHNub3d8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=60";
      } else if (
        description == "overcast clouds" ||
        description == "broken clouds"
      ) {
        img =
          "https://images.unsplash.com/photo-1515890922410-ae767899d6b3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8Y2xvdWR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
      } else if (description == "clear sky") {
        img =
          "https://images.unsplash.com/photo-1540308990836-5a7b1df6dc00?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTF8fGNsZWFyJTIwc2t5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
      } else if (
        description == "haze" ||
        description == "mist" ||
        description == "fog"
      ) {
        img =
          "https://images.unsplash.com/photo-1533708985023-a9726305e9c8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fGhhemV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
      }

      const cardHtml = createCardHtml(
        name,
        emoji,
        temp,
        feelsLike,
        description,
        img
      );

      weatherCard.innerHTML = cardHtml;
    } catch (error) {
      weatherCard.innerHTML = error;
    }
  });
});
