'use strict';
export default class Menu {
  constructor() {
    this.markup = `<div class="search-box">
      <span></span>
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
      let splitItem = item.url_alias.split('/');
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
    // console.log(spliceMenu);
    let cleanMenuSection = {};
    for (let lvl in spliceMenu) {
      // console.log(lvl);
      // console.log(spliceMenu[lvl]);
      if (spliceMenu.hasOwnProperty(lvl) && spliceMenu[lvl].length) {
        switch (lvl) {
          case 'lvl1':
            spliceMenu[lvl].forEach(function(item){
              let tempIndex = item.data.url_alias.split('/');
              let tempIndexLast = tempIndex[tempIndex.length - 1].split('?')[0];
              cleanMenuSection[tempIndexLast] = {link: item.data.url_alias.split('?')[0], name: item.data.name, children: {}};
            });
            break;
          case 'lvl2':
            spliceMenu[lvl].forEach(function(item){
              let tempIndex = item.data.url_alias.split('/');
              let tempIndex1 = tempIndex[tempIndex.length - 2];
              let tempIndexLast = tempIndex[tempIndex.length - 1].split('?')[0];
              // console.log(item);
              // console.log(tempIndex1);
              // console.log(tempIndexLast);
              if(item.data.field_organization_head_name){
                cleanMenuSection[tempIndex1].children[tempIndexLast] = {link: item.data.url_alias.split('?')[0], name: item.data.name, person: item.data.field_organization_head_name,children: {}};
              }else{
                cleanMenuSection[tempIndex1].children[tempIndexLast] = {link: item.data.url_alias.split('?')[0], name: item.data.name, children: {}};
              }
            });
            break;
          case 'lvl3':
            spliceMenu[lvl].forEach(function(item){
              let tempIndex = item.data.url_alias.split('/');
              let tempIndex1 = tempIndex[tempIndex.length - 3];
              let tempIndex2 = tempIndex[tempIndex.length - 2];
              let tempIndexLast = tempIndex[tempIndex.length - 1].split('?')[0];
              // console.log(item);
              // console.log(tempIndex1);
              // console.log(tempIndex2);
              // console.log(tempIndexLast);
              cleanMenuSection[tempIndex1].children[tempIndex2].children[tempIndexLast] = {link: item.data.url_alias.split('?')[0], name: item.data.name, children: {}};
            });
            break;
          case 'lvl4':
            spliceMenu[lvl].forEach(function(item){
              let tempIndex = item.data.url_alias.split('/');
              let tempIndex1 = tempIndex[tempIndex.length - 4];
              let tempIndex2 = tempIndex[tempIndex.length - 3];
              let tempIndex3 = tempIndex[tempIndex.length - 2];
              let tempIndexLast = tempIndex[tempIndex.length - 1].split('?')[0];
              // console.log(item);
              // console.log(tempIndex1);
              // console.log(tempIndex2);
              // console.log(tempIndex3);
              // console.log(tempIndexLast);
              cleanMenuSection[tempIndex1].children[tempIndex2].children[tempIndex3].children[tempIndexLast] = {link: item.data.url_alias.split('?')[0], name: item.data.name, children: {}};
            });
            break;
          default:

        }
      }
    }
    return cleanMenuSection;
  }
  checkAlias(item){
    let tempResult = '';
    switch (item.name) {
      case 'City Council At Large':
        tempResult = `<a href="${item.link}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      case 'City Council  At Large':
        tempResult = `<a href="${item.link}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      case 'City Council  District 1':
        tempResult = `<a href="${item.link}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      case 'City Council  District 2':
        tempResult = `<a href="${item.link}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      case 'City Council  District 3':
        tempResult = `<a href="${item.link}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      case 'City Council  District 4':
        tempResult = `<a href="${item.link}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      case 'City Council  District 5':
        tempResult = `<a href="${item.link}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      case 'City Council  District 6':
        tempResult = `<a href="${item.link}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      case 'City Council  District 7':
        tempResult = `<a href="${item.link}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      default:
        tempResult = `<a href="${item.link}"><span>${item.name}</span></a>`;
        break;
    }
    return tempResult;
  }
  buildMenu(data, controller) {
    let protocol = window.location.protocol;
    let baseURL = window.location.host;
    data = Array.from(data);
    if (data.length) {
      controller.menu.markup += `<article class="nav-container lvl-1">`;
      data.forEach(function(taxSet) {
        // console.log(taxSet);
        controller.menu.markup +=
        `<div class="nav-item lvl-1">
        ${taxSet.name == 'DEPARTMENTS' ? `<a href="${protocol}//${baseURL}/${taxSet.name.toLowerCase()}"><span>${taxSet.name}</span></a>` : ''}
        ${taxSet.name == 'GOVERNMENT' ? `<a href="${protocol}//${baseURL}/${taxSet.name.toLowerCase()}"><span>${taxSet.name}</span></a>` : ''}
        ${taxSet.name == 'HOW DO I' ? `<a href="${protocol}//${baseURL}/how-do-i"><span>${taxSet.name}</span></a>` : ''}
        <div class="sub-items-btn"></div>
        <article class="nav-container lvl-2">
          <div class="nav-item back lvl-2">
            <i class="fas fa-angle-left"></i> BACK
          </div>`;
        let multiMenu = controller.menu.buildMenuLvls(taxSet, controller);
        for (var link in multiMenu) {
          if (multiMenu.hasOwnProperty(link)) {
            controller.menu.markup +=
            `<div class="nav-item lvl-2">
              <a href="${multiMenu[link].link}"><span>${multiMenu[link].name}</span></a>`;
              if(Object.keys(multiMenu[link].children).length !== 0 && multiMenu[link].children.constructor === Object){
                controller.menu.markup += `<div class="sub-items-btn"></div>
                <article class="nav-container lvl-3">
                  <div class="nav-item back lvl-3">
                    <i class="fas fa-angle-left"></i> BACK
                  </div>`;
                for (var linkChild in multiMenu[link].children) {
                  if (multiMenu[link].children.hasOwnProperty(linkChild)) {
                    controller.menu.markup +=
                    `<div class="nav-item lvl-3">
                      ${controller.menu.checkAlias(multiMenu[link].children[linkChild])}
                      `;
                      if(Object.keys(multiMenu[link].children[linkChild].children).length !== 0 && multiMenu[link].children[linkChild].children.constructor === Object){
                        controller.menu.markup += `<div class="sub-items-btn"></div>
                        <article class="nav-container lvl-4">
                          <div class="nav-item back lvl-4">
                            <i class="fas fa-angle-left"></i> BACK
                          </div>`;
                        for (var linkgrandChild in multiMenu[link].children[linkChild].children) {
                          if (multiMenu[link].children[linkChild].children.hasOwnProperty(linkgrandChild)) {
                            controller.menu.markup +=
                            `<div class="nav-item lvl-4">
                              <a href="${multiMenu[link].children[linkChild].children[linkgrandChild].link}"><span>${multiMenu[link].children[linkChild].children[linkgrandChild].name}</span></a>`;
                              if(Object.keys(multiMenu[link].children[linkChild].children[linkgrandChild].children).length !== 0 && multiMenu[link].children[linkChild].children[linkgrandChild].children.constructor === Object){
                                controller.menu.markup += `<div class="sub-items-btn"></div>
                                <article class="nav-container lvl-5">
                                  <div class="nav-item back lvl-5">
                                    <i class="fas fa-angle-left"></i> BACK
                                  </div>`;
                                for (var linkgreatGrandChild in multiMenu[link].children[linkChild].children[linkgrandChild].children) {
                                  if (multiMenu[link].children[linkChild].children[linkgrandChild].children.hasOwnProperty(linkgreatGrandChild)) {
                                    controller.menu.markup +=
                                    `<div class="nav-item lvl-5">
                                      <a href="${multiMenu[link].children[linkChild].children[linkgrandChild].children[linkgreatGrandChild].link}"><span>${multiMenu[link].children[linkChild].children[linkgrandChild].children[linkgreatGrandChild].name}</span></a>`;
                                      if(Object.keys(multiMenu[link].children[linkChild].children[linkgrandChild].children[linkgreatGrandChild].children).length !== 0 && multiMenu[link].children[linkChild].children[linkgrandChild].children[linkgreatGrandChild].children.constructor === Object){
                                        controller.menu.markup += `<div class="sub-items-btn"></div>
                                        <article class="nav-container lvl-6">
                                          <div class="nav-item back lvl-6">
                                            <i class="fas fa-angle-left"></i> BACK
                                          </div>
                                        </article>`;
                                      }
                                      controller.menu.markup +=`</div>`;
                                  }
                                }
                                controller.menu.markup += `</article>`;
                              }
                              controller.menu.markup +=`</div>`;
                          }
                        }
                        controller.menu.markup += `</article>`;
                      }
                      controller.menu.markup +=`</div>`;
                  }
                }
                controller.menu.markup += `</article>`;
              }
             controller.menu.markup += `</div>`;
          }
        }
        controller.menu.markup += `</div>`;
      });
      controller.menu.markup +=
      `<div class="nav-item lvl-1">
        <a href="${protocol}//${baseURL}/buses"><span>BUSES</span></a>
       </div>
       <div class="nav-item lvl-1">
         <a href="${protocol}//${baseURL}/jobs"><span>JOBS</span></a>
       </div>
       <div class="nav-item lvl-1">
        <a href="${protocol}//${baseURL}/pay"><span>PAY</span></a>
       </div>
       <div class="nav-item lvl-1">
        <a href="${protocol}//${baseURL}/water"><span>WATER</span></a>
       </div>
       <div class="nav-item lvl-1">
        <a href="${protocol}//${baseURL}/events"><span>EVENTS</span></a>
       </div>
       <div class="nav-item lvl-1">
        <a href="${protocol}//${baseURL}/news"><span>NEWS</span></a>
       </div>
       <div class="nav-item lvl-1">
        <a href="${protocol}//${baseURL}/documents"><span>DOCUMENTS</span></a>
       </div>
       <div class="nav-item lvl-1">
         <a href="${protocol}//${baseURL}/forms"><span>FORMS</span></a>
        </div>
        <div class="nav-item lvl-1">
         <a href="${protocol}//${baseURL}/city-hotlines"><span>HOTLINES</span></a>
        </div>
      </article>`;
    }
    let param;
    
    const url = 'https://apis.detroitmi.gov/data_cache/user_cache/data/';
    // white listing site menu that gets cached
    switch (baseURL) {
      case 'detroitmi.theneighborhoods.org':
        // Updating DEV menu cache
        param = {
          "key": "user_cache_detroitmi_menu_dev",
          "data": {
            "markup": controller.menu.markup
          }
        };
        break;

      case 'stagedetroitmi.theneighborhoods.org':
        // Updating STAGE menu cache
        param = {
          "key": "user_cache_detroitmi_menu_stage",
          "data": {
            "markup": controller.menu.markup
          }
        };
        break;

      case 'detroitmi.prod.acquia-sites.com':
        // Updating PROD menu cache
        param = {
          "key": "user_cache_detroitmi_menu_dev",
          "data": {
            "markup": controller.menu.markup
          }
        };
        
        break;
    
      default:
        console.log('testing env');
        break;
    }
    console.log(param);
    // Create our request constructor with all the parameters we need
    let request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(param),
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      mode: 'cors',
      cache: 'default'
    });
    if(param !== undefined){
      fetch(request)
      .then((resp) => {
        // console.log(resp);
        // console.log(resp.status);
        if(resp.status === 201){
            // console.log('item submitted');
          }
      });
    }
    
    controller.menu.render(controller.menu.markup, controller);
  }
  navLevelChange(ev) {
    // console.log(ev);
    let pastClass = ev.target.nextElementSibling.className.split(' ');
    // console.log(pastClass);
    let tempClass = '';
    let newClass = 'active ' + ev.target.nextElementSibling.className;
    ev.target.nextElementSibling.className = newClass;
  }
  searchBar(ev) {
    // console.log(ev);
    // console.log(ev.target.value);
    // console.log(JSON.stringify(ev.target.value));
    let str = ev.target.value.replace(/\s/g, "+");
    // console.log(str);
    window.location.href = `http://detroitmi.theneighborhoods.org/search?search=${str}`;
  }
  navBackLevel(ev) {
    // console.log(ev);
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
    // console.log(newClass);
    ev.target.parentNode.className = newClass;
  }
  render(markup, controller) {
    // console.log(markup);
    document.querySelector('.big-nav').innerHTML = markup;
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
