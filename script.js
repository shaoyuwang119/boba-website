function arrangeHeader() {
	const header = document.querySelector(".header");
	header.innerHTML = header.textContent
		.split("")
		.map((letter) => {
			const angle = (Math.random() * 20 - 10).toFixed(2); // random -5° to +5°
			return `<span style="display:inline-block; transform:rotate(${angle}deg)">${letter}</span>`;
		})
		.join("");
}

function generateCalendar(id) {
	const calendar = document.getElementById(id);
	const date = new Date();
	const month = date.getMonth();
	const year = date.getFullYear();

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	let firstDay = new Date(year, month, 1).getDay();

	let html = `<div class="calendar">
      <div class="calendar-header">${monthNames[month]} ${year}</div>
      <div class="calendar-grid">
        <div class="day-name">S</div>
        <div class="day-name">M</div>
        <div class="day-name">T</div>
        <div class="day-name">W</div>
        <div class="day-name">T</div>
        <div class="day-name">F</div>
        <div class="day-name">S</div>`;

	for (let i = 0; i < firstDay; i++) {
		html += `<div class="day empty"></div>`;
	}

	for (let d = 1; d <= daysInMonth; d++) {
		html += `<div class="day">${d}</div>`;
	}

	html += "</div></div>";
	calendar.innerHTML = html;
}

function getCurrentTime() {
	const monthNames = [
		"january",
		"february",
		"march",
		"april",
		"may",
		"june",
		"july",
		"august",
		"september",
		"october",
		"november",
		"december",
	];

	const dayNames = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
	];

	const monthtxt = document.getElementById("month");
	const datetxt = document.getElementById("date");
	const daytxt = document.getElementById("day");

	const now = new Date();
	const month = monthNames[now.getMonth()];
	const weekday = dayNames[now.getDay()];

	monthtxt.innerHTML = month;
	datetxt.innerHTML = now.getDate();
	daytxt.innerHTML = weekday;

	const timetxt = document.getElementById("time");
	const hrs = now.getHours().toString().padStart(2, "0");
	const mins = now.getMinutes().toString().padStart(2, "0");
	const secs = now.getSeconds().toString().padStart(2, "0");
	timetxt.innerHTML = `${hrs}:${mins}:${secs}`;
}

function icon(iconCode) {
	const map = {
		"01d": "☀️",
		"01n": "🌙",
		"02d": "🌤️",
		"02n": "🌤️",
		"03d": "☁️",
		"03n": "☁️",
		"04d": "☁️",
		"04n": "☁️",
		"09d": "🌧️",
		"09n": "🌧️",
		"10d": "🌦️",
		"10n": "🌦️",
		"11d": "⛈️",
		"11n": "⛈️",
		"13d": "❄️",
		"13n": "❄️",
		"50d": "🌫️",
		"50n": "🌫️",
	};
	return map[iconCode] || "❓";
}

async function getWeather() {
	const weatherBox = document.getElementById("weather");
	const apiKey = "159001cf1170d6fe61928fb5b63060da";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=Austin,US&units=imperial&appid=${apiKey}`;

	try {
		const res = await fetch(url);
		const data = await res.json();

		const temp = Math.round(data.main.temp);
		const desc = data.weather[0].description;
		const icons = icon(data.weather[0].icon);

		weatherBox.innerHTML = `
        <div style="text-align:center; gap:10px; margin-top:-10px">
          <b>${icons}austin, tx</b> - ${temp}°f
          </div>
        </div>
      `;
	} catch (e) {
		console.error(e);
		weatherBox.innerHTML = "";
	}
}

arrangeHeader();
setInterval(getCurrentTime, 200);
getWeather();
