'use strict';
import "babel-polyfill";
import "isomorphic-fetch";
import Menu from './menu.class.js';
export default class Controller {
  constructor() {
    this.taxonomy = {
      departments: null,
      government: null
    };
    this.menu = new Menu();
    this.init(this);
  }
  init(controller){
    controller.getTaxomy(controller);
  }
  getTaxomy(controller){
    let departments = new Promise((resolve, reject) => {
      let url = "http://detroitmi.theneighborhoods.org/rest/menu/department?_format=hal_json";
      return fetch(url,{mode: 'cors'})
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({name: 'DEPARTMENTS', data: data});
      });
    });
    let government = new Promise((resolve, reject) => {
      let url = "http://detroitmi.theneighborhoods.org/rest/menu/government?_format=hal_json";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({name: 'GOVERNMENT', data: data});
      });
    });
    let howDoI = new Promise((resolve, reject) => {
      let url = "http://detroitmi.theneighborhoods.org/rest/menu/interactions?_format=hal_json";
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        console.log(data);
        resolve({name: 'HOW DO I', data: data});
      });
    });
    Promise.all([departments, government, howDoI]).then(values => {
        console.log(values); //one, two
        controller.menu.buildMenu(values, controller);
    }).catch(reason => {
      console.log(reason);
    });
  }
}
