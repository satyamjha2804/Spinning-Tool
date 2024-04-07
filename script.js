document.addEventListener("DOMContentLoaded", function () {
  const spinningWheelElement = document.querySelector('.winnerNum');
  const spinButton = document.querySelector('.spin');
  const resultContainer = document.querySelector('.result-container'); 

  spinButton.addEventListener('click', () => {
      spinButton.disabled = true; 
      const wheel = document.querySelector('.container');
      const currentRotation = parseFloat(getComputedStyle(wheel).getPropertyValue('--rotation') || 0);
      const randomRotation = currentRotation + 360 * 5 + Math.floor(Math.random() * 360) + 360 * Math.floor(Math.random() * 5 + 1); 
      spinningWheelElement.style.transition = 'transform 5s ease-in-out';
      spinningWheelElement.style.transform = `rotate(${randomRotation}deg)`;

      
      wheel.style.setProperty('--rotation', `${randomRotation}deg`);

      setTimeout(() => {
      
          spinButton.disabled = false;

          const segmentAngle = 30;
          const totalSegments = 12; 
          let selectedSegment = Math.floor((randomRotation % 360) / (360 / totalSegments));
          selectedSegment = (totalSegments - selectedSegment) % totalSegments; 
          const selectedColorElement = document.querySelector(`.number:nth-child(${selectedSegment + 1})`);
          const selectedColor = getComputedStyle(selectedColorElement).getPropertyValue('--color').trim(); 
          const selectedColorName = selectedColorElement.querySelector('span').textContent.trim(); 

          displayColorMeaning(selectedColor, selectedColorName);
      }, 5000); 
  });

function displayColorMeaning(color, colorName) {
  const colorMeanings = {
      'red': 'Passion, energy, excitement',
      'orange': 'Creativity, enthusiasm, warmth',
      'yellow': 'Happiness, positivity, optimism',
      'darkgreen': 'Growth, harmony, renewal',
      'lightgreen': 'Harmony, balance, nature',
      'blue': 'Calmness, trust, stability',
      'purple': 'Luxury, spirituality, creativity',
      'brown': 'Stability, reliability, earthiness',
      'teal': 'Serenity, communication, balance',
      'lightblue': 'Tranquility, peace, clarity',
      'lightpink': 'Love, romance, affection',
      'lightcoral': 'Friendship, nurturing, warmth'
      
  };

  const meaning = colorMeanings[color.toLowerCase()];

  if (meaning) {
      resultContainer.innerHTML = `The wheel stopped at :- ${colorName}.<br> Meaning:- ${meaning}`;
      resultContainer.style.display = 'block'; 
  } else {
      resultContainer.textContent = `Could not determine the meaning of ${colorName}.`;
      resultContainer.style.display = 'block'; 
  }
  }
});



