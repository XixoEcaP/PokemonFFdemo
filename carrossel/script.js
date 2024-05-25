const imageList = [
  "../images/amsterdam.png",
  "../images/berlin.png",
  "../images/luxembourg.png",
  "../images/montevideo.png",
  "../images/stuttgart.png",
  "../images/toronto.png",
 "../images/christiania.png",
  "../images/nimbin.png",
  "../images/barcelona.png",
  "../images/portland.png",
  "../images/negril.png",
  "../images/oakland.png",
  "../images/vancouver.png",
  "../images/cologne.png",
  "../images/mexico_city.png",
  "../images/st_pauls_bay.png",
 "../images/los_angeles.png",
  "../images/denver.png",
  "../images/seattle.png",
  "../images/san_francisco.png",
  "../images/buenos_aires.png",
  "../images/santiago.png",
  "../images/lima.png",
  "../images/bogota.png",
  "../images/rome.png",
  "../images/athens.png",
  "../images/bangkok.png",
  "../images/phnom_penh.png",
  "../images/tbilisi.png",
  "../images/kingston.png",
  "../images/montego_bay.png",
  "../images/reykjavik.png",
];

let currentImageIndex = 0;

const galleryImage = document.getElementById("gallery-image");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

prevButton.addEventListener("click", () => {
  currentImageIndex--;
  if (currentImageIndex < 0) {
    currentImageIndex = imageList.length - 1;
  }
  galleryImage.src = imageList[currentImageIndex];
});

nextButton.addEventListener("click", () => {
  currentImageIndex++;
  if (currentImageIndex >= imageList.length) {
    currentImageIndex = 0;
  }
  galleryImage.src = imageList[currentImageIndex];
});

