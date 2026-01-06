// Ждем, когда весь HTML документ будет полностью загружен
// Это нужно, чтобы все элементы, к которым мы обращаемся, существовали
document.addEventListener('DOMContentLoaded', () => {
  // СОБИРАЕМ ВСЕ НУЖНЫЕ ЭЛЕМЕНТЫ СО СТРАНИЦЫ

  // 1. Кнопка бургер-меню (круглая синяя кнопка с иконкой)
  const menuToggle = document.querySelector('.page-header__menu-toggle');

  // 2. Навигационное меню (выдвигающаяся панель)
  const nav = document.querySelector('.page-header__nav');

  // 3. Тело документа (нужно для блокировки прокрутки)
  const body = document.body;

  // 4. Иконка внутри кнопки (элемент <use> в SVG)
  const menuIcon = document.querySelector('.page-header__menu-icon use');

  // 5. Текст "МЕНЮ" (находится слева от кнопки)
  const menuName = document.querySelector('.page-header__menu-name');

  // 6. Внешний контейнер меню (белая кнопка с текстом "МЕНЮ" и синей рамкой)
  const menuContainer = document.querySelector('.page-header__menu');

  // 7. Логотип (нужен для скрытия при открытом меню)
  const logo = document.querySelector('.page-header__logo');

  // СОЗДАЕМ ПЕРЕМЕННУЮ ДЛЯ ОТСЛЕЖИВАНИЯ СОСТОЯНИЯ
  // false = меню закрыто, true = меню открыто
  let isExpanded = false;

  // ФУНКЦИЯ ДЛЯ ОТКРЫТИЯ/ЗАКРЫТИЯ МЕНЮ
  function toggleMenu() {
    // МЕНЯЕМ СОСТОЯНИЕ НА ПРОТИВОПОЛОЖНОЕ
    isExpanded = !isExpanded;

    // 1. ПЕРЕКЛЮЧАЕМ КЛАССЫ С МОДИФИКАТОРОМ --active
    menuToggle.classList.toggle('page-header__menu-toggle--active');
    nav.classList.toggle('page-header__nav--active');
    menuContainer.classList.toggle('page-header__menu--active');

    // 2. УПРАВЛЯЕМ ЛОГОТИПОМ - скрываем/показываем
    if (logo) {
      logo.classList.toggle('page-header__logo--hidden');
    }

    // 3. ОБНОВЛЯЕМ АТРИБУТ ДЛЯ ДОСТУПНОСТИ
    menuToggle.setAttribute('aria-expanded', isExpanded);

    // 4. БЛОКИРУЕМ ПРОКРУТКУ СТРАНИЦЫ ПРИ ОТКРЫТОМ МЕНЮ
    body.style.overflow = isExpanded ? 'hidden' : '';

    // 5. МЕНЯЕМ ИКОНКУ БУРГЕРА НА КРЕСТИК И ОБРАТНО
    if (menuIcon) {
      const newHref = isExpanded ? '#sprite-menu-cross' : '#sprite-burger-menu';
      menuIcon.setAttribute('href', newHref);
    }
  }

  // ФУНКЦИЯ ДЛЯ ПОЛНОГО ЗАКРЫТИЯ МЕНЮ
  function closeMenu() {
    // Если меню уже закрыто, ничего не делаем
    if (!isExpanded) return;

    // Устанавливаем состояние "закрыто"
    isExpanded = false;

    // 1. УБИРАЕМ КЛАССЫ С МОДИФИКАТОРОМ --active
    menuToggle.classList.remove('page-header__menu-toggle--active');
    nav.classList.remove('page-header__nav--active');
    menuContainer.classList.remove('page-header__menu--active');

    // 2. ВОЗВРАЩАЕМ ЛОГОТИП (убираем класс скрытия)
    if (logo) {
      logo.classList.remove('page-header__logo--hidden');
    }

    // 3. ОБНОВЛЯЕМ АТРИБУТ ДОСТУПНОСТИ
    menuToggle.setAttribute('aria-expanded', 'false');

    // 4. РАЗБЛОКИРУЕМ ПРОКРУТКУ СТРАНИЦЫ
    body.style.overflow = '';

    // 5. ВОЗВРАЩАЕМ ИКОНКУ БУРГЕРА
    if (menuIcon) {
      menuIcon.setAttribute('href', '#sprite-burger-menu');
    }
  }

  // ОСНОВНОЙ ОБРАБОТЧИК КЛИКА - ВЕШАЕМ НА ВЕСЬ БЛОК МЕНЮ
  menuContainer.addEventListener('click', () => {
    toggleMenu();
  });

  // ОБРАБОТЧИК ДЛЯ КНОПКИ (чтобы остановить всплытие)
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // ОБРАБОТКА ВЫПАДАЮЩЕГО МЕНЮ "ПРОГРАММЫ"
  const programsDropdown = document.querySelector('.programs-dropdown');
  if (programsDropdown) {
    const summary = programsDropdown.querySelector('summary');

    summary.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      programsDropdown.open = !programsDropdown.open;
    });

    programsDropdown.querySelectorAll('.submenu a').forEach((link) => {
      link.addEventListener('click', () => {
        programsDropdown.open = false;
        closeMenu();
      });
    });
  }

  // ЗАКРЫТИЕ МЕНЮ ПРИ КЛИКЕ НА ЛЮБУЮ ДРУГУЮ ССЫЛКУ В МЕНЮ
  document.querySelectorAll('.page-header__nav-link:not(.submenu-toggle)').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.programs-dropdown').forEach((details) => {
        details.open = false;
      });
      closeMenu();
    });
  });

  // ЗАКРЫТИЕ МЕНЮ ПРИ КЛИКЕ НА ФОН
  nav.addEventListener('click', (e) => {
    if (e.target === nav || e.target.classList.contains('page-header__nav')) {
      closeMenu();
    }
  });

  // ОБРАБОТКА ИЗМЕНЕНИЯ РАЗМЕРА ОКНА
  window.addEventListener('resize', () => {
    // Этот код срабатывает при изменении размера окна
    // В текущей реализации ничего не делаем
  });
});
