'use strict';
import Controller from './controller.class.js';
(function(){
  let controller = new Controller();
  let menuToggle = function menuToggle(ev){
    // console.log(ev);
    if(ev.target.checked){
      document.querySelector('.nav-container.lvl-1').className = 'active nav-container lvl-1';
    }else{
      let navContainers = Array.from(document.querySelectorAll('.active.nav-container'));
      // console.log(navContainers);
      navContainers.forEach(function(container){
        let tempClass = container.className.split(' ');
        let newClass = '';
        tempClass.forEach(function(str){
          (str != 'active') ? newClass += str + ' ' : 0;
        });
        // console.log(newClass);
        container.className = newClass;
      });
    }
  };
  // console.log('starting js');
  document.getElementById('big-menu').addEventListener('change', function(e){
    menuToggle(e);
  });
  document.getElementById('big-menu').checked = false;
})(window);
