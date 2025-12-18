// https://swiperjs.com/get-started#installation
// import Swiper from "swiper";
// import {Navigation, Pagination} from "swiper/modules";
// import 'swiper/css';

document.addEventListener('DOMContentLoaded', () => {
  // Элементы меню
  const menuToggle = document.querySelector('.page-header__menu-toggle');
  const nav = document.querySelector('.page-header__nav');
  const body = document.body;
  const menuIcon = document.querySelector('.page-header__menu-icon use');

  // Обработчик бургер-кнопки
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');

    // Блокируем прокрутку body при открытом меню
    body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';

    // Меняем иконку (если у вас есть иконка закрытия в спрайте)
    if (menuIcon) {
      const newHref = isExpanded ? '#sprite-burger-menu' : '#sprite-close-menu';
      menuIcon.setAttribute('href', newHref);
    }
  });

  // Исправляем обработку выпадающего меню "Программы"
  const programsDropdown = document.querySelector('.programs-dropdown');
  if (programsDropdown) {
    const summary = programsDropdown.querySelector('summary');

    // Отключаем стандартное поведение details
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Переключаем состояние details вручную
      programsDropdown.open = !programsDropdown.open;
    });

    // Закрываем подменю при клике на ссылки внутри
    programsDropdown.querySelectorAll('.submenu a').forEach((link) => {
      link.addEventListener('click', () => {
        // Закрываем подменю
        programsDropdown.open = false;

        // Закрываем основное меню
        menuToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('active');
        body.style.overflow = '';

        // Возвращаем иконку бургера
        if (menuIcon) {
          menuIcon.setAttribute('href', '#sprite-burger-menu');
        }
      });
    });
  }

  // Закрытие меню при клике на остальные ссылки
  document.querySelectorAll('.page-header__nav-link:not(.submenu-toggle)').forEach((link) => {
    link.addEventListener('click', () => {
      // Закрываем все открытые details
      document.querySelectorAll('.programs-dropdown').forEach((details) => {
        details.open = false;
      });

      // Закрываем основное меню
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('active');
      body.style.overflow = '';

      // Возвращаем иконку бургера
      if (menuIcon) {
        menuIcon.setAttribute('href', '#sprite-burger-menu');
      }
    });
  });

  // Закрытие меню при клике на фон (затемненную область)
  nav.addEventListener('click', (e) => {
    if (e.target === nav || e.target.classList.contains('page-header__nav')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('active');
      body.style.overflow = '';

      if (menuIcon) {
        menuIcon.setAttribute('href', '#sprite-burger-menu');
      }
    }
  });

  // Адаптация к изменению размера окна
  window.addEventListener('resize', () => {
    // Если меню открыто и изменился размер окна - не закрываем автоматически
    // (меню остается мобильным на всех устройствах)
  });
});
