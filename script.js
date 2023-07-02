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

function setContrastText(color) {
  const brightness = getBrightness(color);
  const textColor = brightness > 127.5 ? "#000" : "#FFF";
  body.style.color = textColor;
  title.style.color = "#000";

  sections.forEach((section) => {
    const sectionText = section.querySelectorAll("h2, p, li");
    sectionText.forEach((text) => {
      text.style.color = textColor;
    });
  });
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
