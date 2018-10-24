'use strict';
export default class Menu {
  constructor() {
    this.markup;
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
    try {
      for (let lvl in spliceMenu) {
        // console.log(lvl);
        // console.log(spliceMenu[lvl]);
        if (spliceMenu.hasOwnProperty(lvl) && spliceMenu[lvl].length) {
          switch (lvl) {
            case 'lvl1':
              spliceMenu[lvl].forEach(function(item){
                let tempIndex = item.data.url_alias.split('/');
                let tempIndexLast = tempIndex[tempIndex.length - 1].split('?')[0];
                if(controller.language == item.data.langcode){
                  // console.log(item);
                  // console.log(tempIndex);
                  // console.log(tempIndexLast);
                  cleanMenuSection[tempIndexLast] = {link: item.data.url_alias.split('?')[0], name: item.data.name, id: item.data.tid, children: {}};
                }
              });
              break;
            case 'lvl2':
              spliceMenu[lvl].forEach(function(item){
                let tempIndex = item.data.url_alias.split('/');
                let tempIndex1 = tempIndex[tempIndex.length - 2];
                let tempIndexLast = tempIndex[tempIndex.length - 1].split('?')[0];
                if(item.data.field_organization_head_name){
                  if(controller.language == item.data.langcode){
                    // console.log(item);
                    // console.log(tempIndex1);
                    // console.log(tempIndexLast);
                    cleanMenuSection[tempIndex1].children[tempIndexLast] = {link: item.data.url_alias.split('?')[0], name: item.data.name, id: item.data.tid, person: item.data.field_organization_head_name,children: {}};
                  }
                }else{
                  if(controller.language == item.data.langcode){
                    // console.log(item);
                    // console.log(tempIndex1);
                    // console.log(tempIndexLast);
                    cleanMenuSection[tempIndex1].children[tempIndexLast] = {link: item.data.url_alias.split('?')[0], name: item.data.name, id: item.data.tid, children: {}};
                  }
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
                if(controller.language == item.data.langcode){
                  cleanMenuSection[tempIndex1].children[tempIndex2].children[tempIndexLast] = {link: item.data.url_alias.split('?')[0], name: item.data.name, id: item.data.tid, children: {}};
                }
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
                if(controller.language == item.data.langcode){
                  cleanMenuSection[tempIndex1].children[tempIndex2].children[tempIndex3].children[tempIndexLast] = {link: item.data.url_alias.split('?')[0], name: item.data.name, id: item.data.tid, children: {}};
                }
              });
              break;
            default:
  
          }
        }
      }
      return cleanMenuSection;
    } catch (error) {
      // console.log(error);
      return 0;
    }
  }
  checkAlias(item, lang){
    // console.log(item);
    let tempLang = (lang == 'en') ? '' : `/${lang}`;
    let tempResult = '';
    switch (item.id) {
      case '1501':
        tempResult = `<a href="${tempLang}/taxonomy/term/${item.id}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      case '1496':
        tempResult = `<a href="${tempLang}/taxonomy/term/${item.id}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      case '1276':
        tempResult = `<a href="${tempLang}/taxonomy/term/${item.id}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      case '1476':
        tempResult = `<a href="${tempLang}/taxonomy/term/${item.id}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      case '1481':
        tempResult = `<a href="${tempLang}/taxonomy/term/${item.id}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      case '1486':
        tempResult = `<a href="${tempLang}/taxonomy/term/${item.id}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      case '1346':
        tempResult = `<a href="${tempLang}/taxonomy/term/${item.id}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      case '1491':
        tempResult = `<a href="${tempLang}/taxonomy/term/${item.id}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      case '1511':
        tempResult = `<a href="${tempLang}/taxonomy/term/${item.id}"><span>${item.name} - ${item.person}</span></a>`;
        break;
      default:
        tempResult = `<a href="${tempLang}/taxonomy/term/${item.id}"><span>${item.name}</span></a>`;
        break;
    }
    return tempResult;
  }
  buildMenu(data, controller) {
    // console.log(data);
    controller.menu.markup = `<div class="search-box">
      <span></span>
      <input id="menu-search" type="text" name="" value="" ${controller.language == 'Arabic' ? `placeholder="بحث"`:``}${controller.language == 'Bengali' ? `placeholder="অনুসন্ধান"`:``}${controller.language == 'Spanish' ? `placeholder="BUSCAR"`:``}${controller.language == 'English' ? `placeholder="SEARCH"`:``}>
    </div>`;
    let protocol = window.location.protocol;
    let baseURL = window.location.host;
    let error = false;
    let transWords = [];
    switch(controller.language){
      case 'Arabic':
        transWords.push('DEPARTMENTS','الحكومي','كيف أفعل','الى الخلف','حافلة','وظائف','سد دينه','ماء','أحداث','خبر','وثيقة','إستمارات','الخطوط الساخنة');
      break;
      
      case 'Bengali':
        transWords.push('বিভাগের','সরকার','আমি কিভাবে করবো','ফিরে','যাত্রীবাহী বড় মটরগাড়ী','চাকরি','শোধা','জল','ঘটনাগুলি','সংবাদ','ডকুমেন্টস','ফরম','হটলাইন');
      break;
       
      case 'Spanish':
        transWords.push('DEPARTAMENTOS','GOBIERNO','CÓMO PUEDO','ATRÁS','AUTOBÚS','TRABAJOS','PAGAR','AGUA','EVENTOS','NOTICIAS','DOCUMENTOS','FORMAS','COMUNICACIONES DIRECTAS');
      break;

      default:
        transWords.push('DEPARTMENTS','GOVERNMENT','HOW DO I','BACK','BUSES','JOBS','PAY','WATER','EVENTS','NEWS','DOCUMENTS','FORMS','HOTLINES');
      break;
    }
    data = Array.from(data);
    if (data.length) {
      controller.menu.markup += `<article class="nav-container lvl-1">`;
      data.forEach(function(taxSet) {
        // console.log(taxSet);
        controller.menu.markup +=
        `<div class="nav-item lvl-1">
        ${taxSet.name == 'DEPARTMENTS' ? `<a href="/${taxSet.name.toLowerCase()}"><span>${transWords[0]}</span></a>` : ''}
        ${taxSet.name == 'GOVERNMENT' ? `<a href="/${taxSet.name.toLowerCase()}"><span>${transWords[1]}</span></a>` : ''}
        ${taxSet.name == 'HOW DO I' ? `<a href="/how-do-i"><span>${transWords[2]}</span></a>` : ''}
        <div class="sub-items-btn"></div>
        <article class="nav-container lvl-2">
          <div class="nav-item back lvl-2">
            <i class="fas fa-angle-left"></i> ${transWords[3]}
          </div>`;
        let multiMenu = controller.menu.buildMenuLvls(taxSet, controller);
        if(multiMenu === 0){
          error =  true;
        }
        let tempLang = (controller.languageCode === 'en') ? '' : `/${controller.languageCode}`;
        for (var link in multiMenu) {
          if (multiMenu.hasOwnProperty(link)) {
            controller.menu.markup +=
            `<div class="nav-item lvl-2">
              <a href="${tempLang}/taxonomy/term/${multiMenu[link].id}"><span>${multiMenu[link].name}</span></a>`;
              if(Object.keys(multiMenu[link].children).length !== 0 && multiMenu[link].children.constructor === Object){
                controller.menu.markup += `<div class="sub-items-btn"></div>
                <article class="nav-container lvl-3">
                  <div class="nav-item back lvl-3">
                    <i class="fas fa-angle-left"></i> ${transWords[3]}
                  </div>`;
                for (var linkChild in multiMenu[link].children) {
                  if (multiMenu[link].children.hasOwnProperty(linkChild)) {
                    controller.menu.markup +=
                    `<div class="nav-item lvl-3">
                      ${controller.menu.checkAlias(multiMenu[link].children[linkChild], controller.languageCode)}
                      `;
                      if(Object.keys(multiMenu[link].children[linkChild].children).length !== 0 && multiMenu[link].children[linkChild].children.constructor === Object){
                        controller.menu.markup += `<div class="sub-items-btn"></div>
                        <article class="nav-container lvl-4">
                          <div class="nav-item back lvl-4">
                            <i class="fas fa-angle-left"></i> ${transWords[3]}
                          </div>`;
                        for (var linkgrandChild in multiMenu[link].children[linkChild].children) {
                          if (multiMenu[link].children[linkChild].children.hasOwnProperty(linkgrandChild)) {
                            controller.menu.markup +=
                            `<div class="nav-item lvl-4">
                              <a href="${tempLang}/taxonomy/term/${multiMenu[link].children[linkChild].children[linkgrandChild].id}"><span>${multiMenu[link].children[linkChild].children[linkgrandChild].name}</span></a>`;
                              if(Object.keys(multiMenu[link].children[linkChild].children[linkgrandChild].children).length !== 0 && multiMenu[link].children[linkChild].children[linkgrandChild].children.constructor === Object){
                                controller.menu.markup += `<div class="sub-items-btn"></div>
                                <article class="nav-container lvl-5">
                                  <div class="nav-item back lvl-5">
                                    <i class="fas fa-angle-left"></i> ${transWords[3]}
                                  </div>`;
                                for (var linkgreatGrandChild in multiMenu[link].children[linkChild].children[linkgrandChild].children) {
                                  if (multiMenu[link].children[linkChild].children[linkgrandChild].children.hasOwnProperty(linkgreatGrandChild)) {
                                    controller.menu.markup +=
                                    `<div class="nav-item lvl-5">
                                      <a href="${tempLang}/taxonomy/term/${multiMenu[link].children[linkChild].children[linkgrandChild].children[linkgreatGrandChild].id}"><span>${multiMenu[link].children[linkChild].children[linkgrandChild].children[linkgreatGrandChild].name}</span></a>`;
                                      if(Object.keys(multiMenu[link].children[linkChild].children[linkgrandChild].children[linkgreatGrandChild].children).length !== 0 && multiMenu[link].children[linkChild].children[linkgrandChild].children[linkgreatGrandChild].children.constructor === Object){
                                        controller.menu.markup += `<div class="sub-items-btn"></div>
                                        <article class="nav-container lvl-6">
                                          <div class="nav-item back lvl-6">
                                            <i class="fas fa-angle-left"></i> ${transWords[3]}
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
        <a href="${protocol}//${baseURL}/buses"><span>${transWords[4]}</span></a>
       </div>
       <div class="nav-item lvl-1">
         <a href="${protocol}//${baseURL}/jobs"><span>${transWords[5]}</span></a>
       </div>
       <div class="nav-item lvl-1">
        <a href="${protocol}//${baseURL}/pay"><span>${transWords[6]}</span></a>
       </div>
       <div class="nav-item lvl-1">
        <a href="${protocol}//${baseURL}/water"><span>${transWords[7]}</span></a>
       </div>
       <div class="nav-item lvl-1">
        <a href="${protocol}//${baseURL}/events"><span>${transWords[8]}</span></a>
       </div>
       <div class="nav-item lvl-1">
        <a href="${protocol}//${baseURL}/news"><span>${transWords[9]}</span></a>
       </div>
       <div class="nav-item lvl-1">
        <a href="${protocol}//${baseURL}/documents"><span>${transWords[10]}</span></a>
       </div>
       <div class="nav-item lvl-1">
         <a href="${protocol}//${baseURL}/forms"><span>${transWords[11]}</span></a>
        </div>
        <div class="nav-item lvl-1">
         <a href="${protocol}//${baseURL}/city-hotlines"><span>${transWords[12]}</span></a>
        </div>
      </article>`;
    }
    let param;
    
    const url = 'https://apis.detroitmi.gov/data_cache/user_cache/data/';
    // white listing site menu that gets cached
    // let prox;
    // (controller.languageCode == 'English') ? prox = '' : prox = `_${controller.languageCode}`; 
    switch (baseURL) {
      case 'detroitmi.gov':
        // Updating DEV menu cache
        param = {
          "key": `detroitmi_menu_prod_${controller.languageCode}`,
          "data": {
            "markup": controller.menu.markup
          }
        };
        break;

      case 'www.detroitmi.gov':
        // Updating DEV menu cache
        param = {
          "key": `detroitmi_menu_prod_${controller.languageCode}`,
          "data": {
            "markup": controller.menu.markup
          }
        };
        break;
    
      default:
        console.log('testing env');
        break;
    }
    // console.log(controller.menu.markup);
    // console.log(url);
    // console.log(param);
    // console.log(error);
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
    if(param !== undefined && !error){
      console.log('posting updates');
      fetch(request)
      .then((resp) => {
        console.log(resp);
        // console.log(resp.status);
        if(resp.status === 201){
            // console.log('item submitted');
          }
      });
    }
    
    // controller.menu.render(controller.menu.markup, controller);
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
    window.location.href = `/search?search=${str}`;
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
