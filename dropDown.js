/* eslint-disable */
// eslint-disable-next-line camelcase
export default function dropDown(btn, max_height) {
  const parent = btn.closest('.js-accordion-parent');
  
  // Проверяем флаг анимации
  if (parent.dataset.animating === 'true') return;
  
  const container = parent.querySelector('.js-accordion-body');
  
  // Устанавливаем флаг блокировки
  parent.dataset.animating = 'true';

  if (parent.classList.contains('active')) {
    parent.classList.remove('active');
    
    if (parent.classList.contains('scroll')) {
      const elementPosition = parent.getBoundingClientRect().top;
      window.scrollBy({ top: elementPosition - 20, behavior: 'smooth' });
      
      setTimeout(() => {
        container.style.maxHeight = `${max_height}px`;
        // Снимаем блокировку после завершения анимации
        setupAnimationEnd(container, parent);
      }, 300);
    } else {
      container.style.maxHeight = `${max_height}px`;
      setupAnimationEnd(container, parent);
    }
  } else {
    parent.classList.add('active');
    container.style.maxHeight = `${container.scrollHeight}px`;
    
    // Обработка дополнительного класса
    if (container.classList.contains('js--not-overflow')) {
      setTimeout(() => {
        container.classList.add('not-overflow');
      }, 700);
    }
    
    setupAnimationEnd(container, parent);
  }
}

// Функция для обработки завершения анимации
function setupAnimationEnd(container, parent) {
  let handled = false;
  
  const complete = () => {
    if (handled) return;
    handled = true;
    container.removeEventListener('transitionend', handler);
    clearTimeout(timeout);
    delete parent.dataset.animating; // Снимаем блокировку
  };

  const handler = (e) => {
    if (e.propertyName === 'max-height') complete();
  };

  // Ждём завершения CSS-анимации
  container.addEventListener('transitionend', handler);
  
  // Защита на случай отсутствия transitionend
  const timeout = setTimeout(complete, 500);
}
