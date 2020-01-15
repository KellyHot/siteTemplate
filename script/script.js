function getPrev(active, length) {
  if (active === 0) return length - 1;
  return active - 1;
}

function getNext(active, length) {
  if (active === length - 1) return 0;
  return active + 1;
}

function changeClass(active, slides, prevActive) {
  if (prevActive !== undefined) {
    slides[prevActive].classList.add('slide--transition');
    slides[prevActive].classList.remove('slide--active');
    slides[getPrev(prevActive, slides.length)].classList.remove('slide--prev');
    slides[getNext(prevActive, slides.length)].classList.remove('slide--next');
  }
  slides[active].classList.add('slide--active');
  slides[getPrev(active, slides.length)].classList.add('slide--prev');
  slides[getNext(active, slides.length)].classList.add('slide--next');
}

document.addEventListener('DOMContentLoaded', function() {
  let active = 0;
  let mod = 'default';
  const container = document.querySelector('.js-container');
  if (container === null) return;
  const slides = [].slice.call(container.querySelectorAll('.js-slide'));
  if (slides.lenght === 0) return;
  slides.forEach(function(slide) {
    ['webkitTransitionEnd','oTransitionEnd', 'otransitionend', 'transitionend'].forEach(function (eventName) {
      slide.addEventListener(eventName, function() {
        container.classList.remove('container--disabled');
        slide.classList.remove('slide--transition');
      });
    });
  });
  const prev = container.querySelector('.js-button--prev');
  const next = container.querySelector('.js-button--next');
  changeClass(active, slides);
  prev.addEventListener('click', function() {
    container.classList.add('container--disabled');
    active = getPrev(active, slides.length);
    changeClass(active, slides, getNext(active, slides.length));
  });
  next.addEventListener('click', function() {
    container.classList.add('container--disabled');
     
    active = getNext(active, slides.length);
    changeClass(active, slides, getPrev(active, slides.length));
  });

  const labels = [].slice.call(document.querySelectorAll('.label'));
  labels.forEach(function(label) {
    label.addEventListener('click', function() {
      container.classList.remove('container--' + mod);
      mod = label.getAttribute('data-id');
      container.classList.add('container--' + mod);
    });
  });
});
