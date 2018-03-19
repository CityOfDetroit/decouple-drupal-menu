'use strict';
export default class Menu {
  constructor() {
    this.markup = `<div class="search-box">
      <span>
        <img src="img/search.png" alt="search">
      </span>
      <input id="menu-search" type="text" name="" value="" placeholder="SEARCH">
    </div>`;
  }
  buildMenu(data, controller){
    data = Array.from(data);
    if(data.length){
      controller.menu.markup += `<article class="nav-container lvl-1">`;
      data.forEach(function(taxSet){
        controller.menu.markup += `<div class="nav-item lvl-1">
        <a href="http://detroitmi.theneighborhoods.org/${taxSet.name.toLowerCase()}"><span>${taxSet.name}</span></a>
        <div class="sub-items-btn">></div>
        <article class="nav-container lvl-2">
          <div class="nav-item back lvl-2">
            < BACK
          </div>`;
        taxSet.data.forEach(function(item){
          controller.menu.markup += `<div class="nav-item lvl-2">
            <a href="http://detroitmi.theneighborhoods.org${item.path[0].alias}" target="_blank"><span>${item.name[0].value}</span></a>
          </div>`;
        });
        controller.menu.markup += `</div>`;
      });
      controller.menu.markup += `</article>`;
    }
    controller.menu.render(controller.menu.markup, controller);
  }
  navLevelChange(ev){
    console.log(ev);
    let pastClass = ev.target.nextElementSibling.className.split(' ');
    console.log(pastClass);
    let tempClass = '';
    let newClass = 'active ' + ev.target.nextElementSibling.className;
    ev.target.nextElementSibling.className = newClass;
  }
  searchBar(ev){
    console.log(ev);
    console.log(ev.target.value);
    console.log(JSON.stringify(ev.target.value));
    let str = ev.target.value.replace(/\s/g, "+");
    console.log(str);
    window.location.href = `http://detroitmi.theneighborhoods.org/search?search=${str}`;
  }
  navBackLevel(ev){
    console.log(ev);
    let parentClass = ev.target.parentNode.className.split(' ');
    let newClass = '';
    let counter = 0;
    parentClass = Array.from(parentClass);
    parentClass.forEach(function(c){
      if(c != "active") {
        newClass += c;
        (counter < (parentClass.length - 2)) ? newClass += ' ' : 0;
      }
    });
    console.log(newClass);
    ev.target.parentNode.className = newClass;
  }
  render(markup, controller){
    console.log(markup);
    document.querySelector('nav').innerHTML = markup;
    let navItems = Array.from(document.querySelectorAll('.sub-items-btn'));
    navItems.forEach(function(item){
      item.addEventListener('click', function(e){
        controller.menu.navLevelChange(e);
      });
    });
    let navBackItems = Array.from(document.querySelectorAll('.back'));
    navBackItems.forEach(function(item){
      item.addEventListener('click', function(e){
        controller.menu.navBackLevel(e);
      });
    });
    document.getElementById('menu-search').addEventListener( 'keyup', function (e) {
      if ( e.keyCode == 13 ) {
        // Simulate clicking on the submit button.
        controller.menu.searchBar(e);
      }
    });
  }
}
