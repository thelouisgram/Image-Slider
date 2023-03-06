import './style.css';

let currentSlide = 0;
let slides = document.querySelectorAll('.slide');
let slideInterval = setInterval(nextSlide, 5000);
let prevBtn = document.querySelector('.prev-btn');
let nextBtn = document.querySelector('.next-btn');
let pagination = document.querySelector('.pagination');

function nextSlide(){
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active')
    updatePaginationButtons();
    clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
}

function prevSlide(){
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add('active')
    updatePaginationButtons();
    clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
}

prevBtn.addEventListener('click', prevSlide)
nextBtn.addEventListener('click', nextSlide)

function createPaginationButtons(){
    for (let i = 0; i < slides.length; i++){
        let button  = document.createElement('button')
        button.classList.add('pagination-button')
        if (i === currentSlide){
            button.classList.add('active');
        }

        button.addEventListener('click',function(){
            slides[currentSlide].classList.remove('active');
            currentSlide = i
            slides[currentSlide].classList.add('active')
            updatePaginationButtons();
            clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
        })
        pagination.appendChild(button);
    }
}

function updatePaginationButtons() {
  let buttons = document.querySelectorAll('.pagination-button');
  for (let i = 0; i < buttons.length; i++) {
    if (i === currentSlide) {
      buttons[i].classList.add('active');
    } else {
      buttons[i].classList.remove('active');
    }
  }
}

createPaginationButtons()

let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
  touchEndX = event.changedTouches[0].clientX;
  handleSwipe();
}

function handleSwipe() {
  const swipeThreshold = 100;
  const deltaX = touchEndX - touchStartX;

  if (deltaX > swipeThreshold) {
    // Swiped to the right, go to the previous slide
    prevSlide();
  } else if (deltaX < -swipeThreshold) {
    // Swiped to the left, go to the next slide
    nextSlide();
  }
}

// Attach touch event listeners to the slider element
const slider = document.querySelector('.container');
slider.addEventListener('touchstart', handleTouchStart);
slider.addEventListener('touchend', handleTouchEnd);