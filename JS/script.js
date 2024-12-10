const weatherContainer = document.getElementById('weather');
const cityname = document.getElementById('cityname');
// const weatherForm = document.getElementById('weatherForm');
const btnSubmit = document.getElementById('btnSubmit');


btnSubmit.addEventListener('click', (e)=>{
  e.preventDefault();
  weatherReport();
});

function fetchWeather(city) {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      try {
        const response = JSON.parse(this.responseText); 
        console.log(response);

        if (response) {
          if (response && response.main && response.weather) {
            response.main.temp=Math.round(((response.main.temp)-32) / (9/5));
            weatherContainer.innerHTML = `
            <h5 class="text-primary mb-3">---Today's Weather Report---</h5>
              <p class="fs-5"><b>City:</b> ${response.name} <span>,${response.sys.country}</span></p>
              <p class="fs-5"><b>Temperature:</b> ${response.main.temp} °C</p>
              <p class="fs-5"><b>Humidity:</b> ${response.main.humidity} %</p>
              <p class="fs-5"><b>Condition:</b> ${response.weather[0].description}</p>
            `;
          } else {
            weatherContainer.innerHTML = `<p class="text-danger fw-semibold h3 text-center">Weather Data Not Found!</p>`;
          }
        } else {
          throw new Error("Empty response from server");
        }
      } catch (error) {
        weatherContainer.innerHTML = `<p class="text-danger">Error fetching weather data: ${error.message}</p>`;
        console.error(error);
      }
    }
  });
  

  xhr.open('GET', `https://open-weather13.p.rapidapi.com/city/${city}/EN`);
  xhr.setRequestHeader('x-rapidapi-key', '0fdf97d786mshfe6215e209b9223p180cbejsn4f93c94ae981');
  xhr.setRequestHeader('x-rapidapi-host', 'open-weather13.p.rapidapi.com');

  xhr.send(null);
}

function weatherReport() {
  const city = cityname.value.trim();
  if (city) {
    weatherContainer.style.display="block";
    weatherContainer.innerHTML = `<p class="fs-3 fw-bold text-info">Loading...</p>`;
    fetchWeather(city);
  } else {
    weatherContainer.innerHTML = `<p class="text-danger">Please enter a city name</p>`;
  }
}
