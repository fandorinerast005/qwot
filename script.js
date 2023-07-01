  // Плавная прокрутка к якорным ссылкам при клике на них
  document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('nav ul li a');
    
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        var targetId = link.getAttribute('href');
        var targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          var offsetTop = targetElement.offsetTop;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  });

  // JavaScript код для изменения цвета фона
  const navLinks = document.querySelectorAll('nav ul li a');
  const body = document.body;
  let currentColor = '#333'; // Изначальный цвет текста

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const randomColor = getRandomColor();
      body.style.backgroundColor = randomColor;
      body.style.color = getContrastColor(randomColor);
      currentColor = body.style.color;
    });
  });

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getContrastColor(color) {
    // Простая проверка для определения яркости цвета
    const brightness = (parseInt(color.substr(1, 2), 16) * 299 +
      parseInt(color.substr(3, 2), 16) * 587 +
      parseInt(color.substr(5, 2), 16) * 114) /
      1000;
    // Возвращаем белый цвет для темных фонов и чёрный цвет для светлых фонов
    return brightness > 125 ? '#000' : '#FFF';
  }

  // Установка изначального цвета текста
  body.style.color = currentColor;