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
  buildMenuLvls(list, controller) {
    let spliceMenu = {
      lvl1: [],
      lvl2: [],
      lvl3: [],
      lvl4: []
    };
    list.data.forEach(function(item) {
      let tempItem = null;
      let splitItem = item._links.self.href.split('/');
      switch (true) {
        case splitItem.length == 5:
          tempItem = {parent: 'none', data: item}
          spliceMenu.lvl1.push(tempItem);
          break;
        case splitItem.length == 6:
          tempItem = {parent: splitItem[splitItem.length - 2], data: item}
          spliceMenu.lvl2.push(tempItem);
          break;
        case splitItem.length == 7:
          tempItem = {parent: splitItem[splitItem.length - 2], data: item}
          spliceMenu.lvl3.push(tempItem);
          break;
        case splitItem.length == 8:
          tempItem = {parent: splitItem[splitItem.length - 2], data: item}
          spliceMenu.lvl4.push(tempItem);
          break;
        default:

      }
    });
    let cleanMenuSection = {};
    for (let lvl in spliceMenu) {
      console.log(lvl);
      console.log(spliceMenu[lvl]);
      if (spliceMenu.hasOwnProperty(lvl) && spliceMenu[lvl].length) {
        switch (lvl) {
          case 'lvl1':
            spliceMenu[lvl].forEach(function(item){
              let tempIndex = item.data._links.self.href.split('/');
              let tempIndexLast = tempIndex[tempIndex.length - 1].split('?')[0];
              cleanMenuSection[tempIndexLast] = {link: item.data._links.self.href.split('?')[0], name: item.data.name[0].value, children: {}};
            });
            break;
          case 'lvl2':
            console.log(cleanMenuSection);
            spliceMenu[lvl].forEach(function(item){
              let tempIndex = item.data._links.self.href.split('/');
              let tempIndex1 = tempIndex[tempIndex.length - 2];
              let tempIndexLast = tempIndex[tempIndex.length - 1].split('?')[0];
              console.log(item);
              console.log(tempIndex1);
              console.log(tempIndexLast);
              cleanMenuSection[tempIndex1].children[tempIndexLast] = {link: item.data._links.self.href.split('?')[0], name: item.data.name[0].value, children: {}};
            });
            break;
          case 'lvl3':
            spliceMenu[lvl].forEach(function(item){
              let tempIndex = item.data._links.self.href.split('/');
              let tempIndex1 = tempIndex[tempIndex.length - 3];
              let tempIndex2 = tempIndex[tempIndex.length - 2];
              let tempIndexLast = tempIndex[tempIndex.length - 1].split('?')[0];
              console.log(item);
              console.log(tempIndex1);
              console.log(tempIndex2);
              console.log(tempIndexLast);
              cleanMenuSection[tempIndex1].children[tempIndex2].children[tempIndexLast] = {link: item.data._links.self.href.split('?')[0], name: item.data.name[0].value, children: {}};
            });
            break;
          case 'lvl4':
            spliceMenu[lvl].forEach(function(item){
              let tempIndex = item.data._links.self.href.split('/');
              let tempIndex1 = tempIndex[tempIndex.length - 4];
              let tempIndex2 = tempIndex[tempIndex.length - 3];
              let tempIndex3 = tempIndex[tempIndex.length - 2];
              let tempIndexLast = tempIndex[tempIndex.length - 1].split('?')[0];
              console.log(item);
              console.log(tempIndex1);
              console.log(tempIndex2);
              console.log(tempIndex3);
              console.log(tempIndexLast);
              cleanMenuSection[tempIndex1].children[tempIndex2].children[tempIndex3].children[tempIndexLast] = {link: item.data._links.self.href.split('?')[0], name: item.data.name[0].value, children: {}};
            });
            break;
          default:

        }
      }
    }
    return cleanMenuSection;
  }
  buildMenu(data, controller) {
    let protocol = window.location.protocol;
    let baseURL = window.location.host;
    data = Array.from(data);
    if (data.length) {
      controller.menu.markup += `<article class="nav-container lvl-1">`;
      data.forEach(function(taxSet) {
        controller.menu.markup +=
        `<div class="nav-item lvl-1">
        <a href="${protocol}//${baseURL}/${taxSet.name.toLowerCase()}"><span>${taxSet.name}</span></a>
        <div class="sub-items-btn"></div>
        <article class="nav-container lvl-2">
          <div class="nav-item back lvl-2">
            < BACK
          </div>`;
        let multiMenu = controller.menu.buildMenuLvls(taxSet, controller);
        controller.menu.markup = `${multiMenu.map(lvl1 =>
          `<div class="nav-item lvl-2">
            <a href="${lvl1.link}"><span>${lvl1.name}</span></a>
            ${Object.keys(lvl1.children).length !== 0 && lvl1.children.constructor === Object ? `<div class="sub-items-btn"></div>
            <article class="nav-container lvl-3">
              <div class="nav-item back lvl-3">
                < BACK
              </div>
            </article>` : ''}

           </div>`
        ).join('')}
        `;
        // taxSet.data.forEach(function(item) {
        //   let alias = item._links.self.href.split('/');
        //   console.log(alias);
        //   let cleanAlias = '';
        //   alias.forEach(function(str, index) {
        //     if (index > 2) {
        //       if (index == alias.length - 1) {
        //         let tempStr = str.split('?');
        //         cleanAlias += tempStr[0];
        //       } else {
        //         cleanAlias += str + '/';
        //       }
        //     }
        //   });
        //   console.log(cleanAlias);
        //   controller.menu.markup += `<div class="nav-item lvl-2">
        //     <a href="${protocol}//${baseURL}/${cleanAlias}" target="_blank"><span>${item.name[0].value}</span></a>
        //   </div>`;
        // });
        // controller.menu.markup += `</div>`;
      });
      controller.menu.markup += `</article>`;
    }
    controller.menu.render(controller.menu.markup, controller);
  }
  navLevelChange(ev) {
    console.log(ev);
    let pastClass = ev.target.nextElementSibling.className.split(' ');
    console.log(pastClass);
    let tempClass = '';
    let newClass = 'active ' + ev.target.nextElementSibling.className;
    ev.target.nextElementSibling.className = newClass;
  }
  searchBar(ev) {
    console.log(ev);
    console.log(ev.target.value);
    console.log(JSON.stringify(ev.target.value));
    let str = ev.target.value.replace(/\s/g, "+");
    console.log(str);
    window.location.href = `http://detroitmi.theneighborhoods.org/search?search=${str}`;
  }
  navBackLevel(ev) {
    console.log(ev);
    let parentClass = ev.target.parentNode.className.split(' ');
    let newClass = '';
    let counter = 0;
    parentClass = Array.from(parentClass);
    parentClass.forEach(function(c) {
      if (c != "active") {
        newClass += c;
        (counter < (parentClass.length - 2)) ? newClass += ' ': 0;
      }
    });
    console.log(newClass);
    ev.target.parentNode.className = newClass;
  }
  render(markup, controller) {
    console.log(markup);
    document.querySelector('nav').innerHTML = markup;
    let navItems = Array.from(document.querySelectorAll('.sub-items-btn'));
    navItems.forEach(function(item) {
      item.addEventListener('click', function(e) {
        controller.menu.navLevelChange(e);
      });
    });
    let navBackItems = Array.from(document.querySelectorAll('.back'));
    navBackItems.forEach(function(item) {
      item.addEventListener('click', function(e) {
        controller.menu.navBackLevel(e);
      });
    });
    document.getElementById('menu-search').addEventListener('keyup', function(e) {
      if (e.keyCode == 13) {
        // Simulate clicking on the submit button.
        controller.menu.searchBar(e);
      }
    });
  }
}
