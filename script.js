  const navLinks = document.querySelectorAll('nav ul li a');
  const body = document.body;
  const header = document.querySelector('header');
  const contactSection = document.getElementById('section4');
  const sections = document.querySelectorAll('section:not(#section4)');
  const footer = document.querySelector('footer');
  const title = document.querySelector('h1');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const randomColor = getRandomColor();
      body.style.backgroundColor = randomColor;
      setContrastText(randomColor);
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

  function setContrastText(backgroundColor) {
    const brightness = getBrightness(backgroundColor);
    const textColor = brightness > 127.5 ? '#000' : '#FFF';
    body.style.color = textColor;
    header.style.color = textColor;
    contactSection.style.color = textColor;
    title.style.color = textColor;
    navLinks.forEach(link => {
      link.style.color = textColor;
    });
    sections.forEach(section => {
      if (section !== contactSection) {
        const sectionText = section.querySelectorAll(':not(h2)');
        sectionText.forEach(text => {
          text.style.color = textColor;
        });
      }
    });
    footer.style.color = textColor;
  }

  function getBrightness(color) {
    const rgb = hexToRgb(color);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness;
  }

  function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }