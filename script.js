"use strict";
const parent = document.querySelector("[data-showColor]");
const isHidden = document.querySelector("[data-hidden]"); //Normal state
const isActive = document.querySelector("[data-active]");

const isActiveDesktop = document.querySelector("[data-activeDesktop]");

// Setting the state in a global state
let state = false;

const isMobile = function (e) {
  e.preventDefault();
  const toggle = e.target.closest("[data-toggle]");

  if (toggle) {
    state = !state;
    if (state) {
      isHidden.classList.add("hide");
      isActive.classList.remove("hide");
      this.classList.add("active__color");
      toggle.classList.add("fill");
    } else {
      this.classList.remove("active__color");
      isActive.classList.add("hide");
      isHidden.classList.remove("hide");
      toggle.classList.remove("fill");
    }
  }
};

const isDesktop = function (e) {
  e.preventDefault();
  const toggle = e.target.closest("[data-toggle]");
  if (toggle) {
    isActiveDesktop.classList.toggle("hide__opacity");
  }
};

const handleDesktopKeyboard = function (e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    const toggle = e.target.closest("[data-toggle]");
    if (toggle) {
      isActiveDesktop.classList.toggle("hide__opacity");
    }
  }
};

const updateEventListeners = function () {
  const desktopActive = window.matchMedia("(min-width: 64em)");

  if (desktopActive.matches) {
    // Is Desktop
    parent.removeEventListener("click", isMobile);
    parent.addEventListener("click", isDesktop);
    parent.addEventListener("keydown", handleDesktopKeyboard);
  } else {
    parent.addEventListener("click", isMobile);
    parent.removeEventListener("click", isDesktop);
  }
};

updateEventListeners();
// Debounced resize event
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(updateEventListeners, 100);
});
