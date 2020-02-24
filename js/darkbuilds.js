jQuery(document).ready(function($) {
let darkMode = localStorage.getItem('darkMode'); 

const darkModeToggle = document.querySelector('#dark-mode-toggle');
const enableDarkMode = () => {
  // 1. Add the class to the body
  document.body.classList.add('darkmode');
  // diff ids of diff sections rip no easy way to do it ;/
  //1)Terms of use
  document.getElementById('build').classList.remove('section-bg');
  document.getElementById('build').classList.add('darkmode-section-bg');
  // 2)Contact
  document.getElementById('contact').classList.remove('section-bg');
  document.getElementById('contact').classList.add('darkmode-section-bg');
  // 3)footer
  document.getElementById('footer').classList.remove('section-bg');
  document.getElementById('footer').classList.add('darkmode-section-bg');
  //a)add darker box for elements changing color
  document.getElementById('contact').classList.add('darkmode-shadow');
  document.getElementById('footer').classList.add('darkmode-shadow');
  document.getElementById('tg').classList.remove('tele');
  document.getElementById('tg').classList.add('darkmode-tele');
  let els = document.querySelectorAll('.figtxt');

els.forEach(function(el) {
  el.classList.add('darkmode-figtxt');
  el.classList.remove('figtxt');
});

  let els1 = document.querySelectorAll('.txt');

els1.forEach(function(el) {
  el.classList.add('darkmode-txt');
  el.classList.remove('txt');
});
  // 2. Update darkMode in localStorage
  localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove('darkmode');
  // diff ids of diff sections rip no easy way to do it ;/
//1)Terms of use
  document.getElementById('build').classList.remove('darkmode-section-bg');
  document.getElementById('build').classList.add('section-bg');
  // 2)Contact
  document.getElementById('contact').classList.remove('darkmode-section-bg');
  document.getElementById('contact').classList.add('section-bg');
  // 3)footer
  document.getElementById('footer').classList.remove('darkmode-section-bg');
  document.getElementById('footer').classList.add('section-bg');
  //a)add darker box for elements changing color
  document.getElementById('contact').classList.remove('darkmode-shadow');
  document.getElementById('footer').classList.remove('darkmode-shadow');
  document.getElementById('tg').classList.remove('darkmode-tele');
  document.getElementById('tg').classList.add('tele');
  let els = document.querySelectorAll('.darkmode-figtxt');
  els.forEach(function(el) {
  el.classList.add('figtxt');
  el.classList.remove('darkmode-figtxt');
});
  
  let els1 = document.querySelectorAll('.darkmode-txt');
  els1.forEach(function(el) {
  el.classList.add('txt');
  el.classList.remove('darkmode-txt');
});
  // 2. Update darkMode in localStorage 
  localStorage.setItem('darkMode', null);
}
 
// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === 'enabled') {
  enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener('click', () => {
  // get their darkMode setting
  darkMode = localStorage.getItem('darkMode'); 
  
  // if it not current enabled, enable it
  if (darkMode !== 'enabled') {
    enableDarkMode();
  // if it has been enabled, turn it off  
  } else {  
    disableDarkMode(); 
  }

});
document.body.onload = function() {

    if (localStorage.getItem("hasCodeRunBefore") === null) {
        enableDarkMode();
        localStorage.setItem("hasCodeRunBefore", true);
    }
}

}); 
 
 
