function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeColor(rectId, codeId) {
  const newColor = getRandomColor();
  document.getElementById(rectId).style.backgroundColor = newColor;
  document.getElementById(codeId).innerText = newColor;
}

function randomizeAllColors() {
  for (let i = 1; i <= 5; i++) {
      changeColor(`rect${i}`, `code${i}`);
  }
}


window.onload = () => {
  randomizeAllColors();
};

