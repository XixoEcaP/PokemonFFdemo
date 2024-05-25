const cities = [
  { name: "Amsterdam", country: "Netherlands", image: "../images/amsterdam.png" },
  { name: "Berlin", country: "Germany", image: "../images/berlin.png" },
  { name: "Luxembourg City", country: "Luxembourg", image: "../images/luxembourg.png" },
  { name: "Montevideo", country: "Uruguay", image: "../images/montevideo.png" },
  { name: "Stuttgart", country: "Germany", image: "../images/stuttgart.png" },
  { name: "Toronto", country: "Canada", image: "../images/toronto.png" },
  { name: "Christiania", country: "Denmark", image: "../images/christiania.png" },
  { name: "Nimbin", country: "Australia", image: "../images/nimbin.png" },
  { name: "Barcelona", country: "Spain", image: "../images/barcelona.png" },
  { name: "Portland", country: "USA", image: "../images/portland.png" },
  { name: "Negril", country: "Jamaica", image: "../images/negril.png" },
  { name: "Oakland", country: "USA", image: "../images/oakland.png" },
  { name: "Vancouver", country: "Canada", image: "../images/vancouver.png" },
  { name: "Cologne", country: "Germany", image: "../images/cologne.png" },
  { name: "Mexico City", country: "Mexico", image: "../images/mexico_city.png" },
  { name: "St Paul's Bay", country: "Malta", image: "../images/st_pauls_bay.png" },
  { name: "Los Angeles", country: "USA", image: "../images/los_angeles.png" },
  { name: "Denver", country: "USA", image: "../images/denver.png" },
  { name: "Seattle", country: "USA", image: "../images/seattle.png" },
  { name: "San Francisco", country: "USA", image: "../images/san_francisco.png" },
  { name: "Buenos Aires", country: "Argentina", image: "../images/buenos_aires.png" },
  { name: "Santiago", country: "Chile", image: "../images/santiago.png" },
  { name: "Lima", country: "Peru", image: "../images/lima.png" },
  { name: "Bogotá", country: "Colombia", image: "../images/bogota.png" },
  { name: "Rome", country: "Italy", image: "../images/rome.png" },
  { name: "Athens", country: "Greece", image: "../images/athens.png" },
  { name: "Bangkok", country: "Thailand", image: "../images/bangkok.png" },
  { name: "Phnom Penh", country: "Cambodia", image: "../images/phnom_penh.png" },
  { name: "Tbilisi", country: "Georgia", image: "../images/tbilisi.png" },
  { name: "Kingston", country: "Jamaica", image: "../images/kingston.png" },
  { name: "Montego Bay", country: "Jamaica", image: "../images/montego_bay.png" },
  { name: "Reykjavik", country: "Iceland", image: "../images/reykjavik.png" },
];


let currentPage = 1;
const itemsPerPage = 8;

document.addEventListener("DOMContentLoaded", function() {
  displayCities(cities, currentPage);
  setupPagination(cities);
  
  document.getElementById('filter-input').addEventListener('input', function() {
      const filterValue = this.value.toLowerCase();
      const filteredCities = cities.filter(city => 
          city.name.toLowerCase().includes(filterValue) ||
          city.country.toLowerCase().includes(filterValue)
      );
      currentPage = 1;
      displayCities(filteredCities, currentPage);
      setupPagination(filteredCities);
  });
});

function displayCities(cities, page) {
  const cityCardsContainer = document.getElementById('city-cards');
  cityCardsContainer.innerHTML = '';

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCities = cities.slice(startIndex, endIndex);

  paginatedCities.forEach(city => {
      const cityCard = document.createElement('div');
      cityCard.classList.add('city-card');
      cityCard.innerHTML = `
          <div class="info">
              <h3>${city.name}</h3>
          </div>
          <img src="${city.image}" alt="${city.name}">
          <div class="info">
              <p>${city.country}</p>
          </div>
      `;
      cityCardsContainer.appendChild(cityCard);
  });
}

function setupPagination(cities) {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';
  const pageCount = Math.ceil(cities.length / itemsPerPage);

  for (let i = 1; i <= pageCount; i++) {
      const pageButton = document.createElement('button');
      pageButton.innerText = i;
      pageButton.classList.add('page-btn');
      if (i === currentPage) {
          pageButton.classList.add('active');
      }
      pageButton.addEventListener('click', function() {
          currentPage = i;
          displayCities(cities, currentPage);
          setupPagination(cities);
      });
      paginationContainer.appendChild(pageButton);
  }
}
