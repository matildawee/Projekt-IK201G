function classToggle() {
  const navs = document.querySelectorAll('.navBarItems')
  
  navs.forEach(nav => nav.classList.toggle('navBarToggleShow'));
}

document.querySelector('.navBarLink-toggle')
  .addEventListener('click', classToggle);