import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { initBurgerMenu } from './burger-menu.js';

document.addEventListener('DOMContentLoaded', () => {
  initBurgerMenu();
});

// // Ждем загрузки DOM
// document.addEventListener('DOMContentLoaded', () => {
//   // Инициализация слайдера hero, если он есть на странице
//   const heroSlider = document.querySelector('.hero__slider');

//   if (heroSlider) {
//     new Swiper(heroSlider, {
//       modules: [Navigation, Pagination],
//       loop: true,
//       pagination: {
//         el: '.hero__pagination',
//         type: 'bullets',
//         clickable: true,
//       },

//     });
//   }
// });

// Инициализация
const swiper = new Swiper('.swiper', {
  modules: [Pagination],

  // Настройки слайдера
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,

  // Настройки пагинации
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets',
  },
});
