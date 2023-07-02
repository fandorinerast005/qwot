const scrollButton = document.querySelector(".scroll-to-top");
const navLinks = document.querySelectorAll("nav ul li a");
const body = document.body;
const sections = document.querySelectorAll("section:not(.header-section)");
const title = document.querySelector("header h1");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 200) {
    scrollButton.classList.add("show");
  } else {
    scrollButton.classList.remove("show");
  }
});

scrollButton.addEventListener("click", (event) => {
  event.preventDefault();
  const randomColor = getRandomColor();
  body.style.backgroundColor = randomColor;
  setContrastText(randomColor);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const randomColor = getRandomColor();
    body.style.backgroundColor = randomColor;
    setContrastText(randomColor);
    const href = link.getAttribute("href");
    document.querySelector(href).scrollIntoView({
      behavior: "smooth",
    });
  });
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const text =
  "Мы работаем по всей Тульской области, возможен выезд в другие регионы!...";
const typingText = document.getElementById("typing-text");
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentText = isDeleting
    ? text.substring(0, charIndex - 1)
    : text.substring(0, charIndex + 1);
  typingText.textContent = currentText;

  if (!isDeleting) {
    charIndex++;
    if (charIndex > text.length) {
      isDeleting = true;
      charIndex = text.length;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
    }
  }
}

setInterval(typeWriter, 100);

const nextButtons = document.querySelectorAll('.next-button');
nextButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const randomColor = getRandomColor();
      body.style.backgroundColor = randomColor;
      setContrastText(randomColor);
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

function setContrastText(color) {
  const brightness = getBrightness(color);
  const textColor = brightness > 0.5 ? "#000" : "#FFF";
  body.style.color = textColor;

  const sectionHeadings = document.querySelectorAll("section:not(.header-section) h2");
  sectionHeadings.forEach((heading) => {
    if (heading.textContent !== "Камин-шабашка") {
      heading.style.color = textColor;
      heading.style.textShadow = `0 0 5px ${textColor}`;
    }
  });
}

function getBrightness(color) {
  const rgb = hexToRgb(color);
  const brightness = (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) / 255;
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
