'use strict';
import "babel-polyfill";
import "isomorphic-fetch";
import Menu from './menu.class.js';
const moment = require('moment');
export default class Controller {
  constructor() {
    this.taxonomy = {
      departments: null,
      government: null
    };
    this.menu = new Menu();
    this.today = moment().add(1, 'hours').format('YYYY-MM-DDTHH:mm:ss');
    this.cache = null;
    this.init(this);
  }
  init(controller){
    // console.log(controller.today);
    // controller.getTaxomy(controller);
    let baseURL = window.location.host;
    let url;

    switch (baseURL) {
      case 'detroitmi.theneighborhoods.org':
        url = "https://apis.detroitmi.gov/data_cache/user_cache/user_cache_detroitmi_menu_dev/";
        break;

      case 'stagedetroitmi.theneighborhoods.org':
        url = "https://apis.detroitmi.gov/data_cache/user_cache/user_cache_detroitmi_menu_stage/";
        break;

      case 'detroitmi.prod.acquia-sites.com':
        url = "https://apis.detroitmi.gov/data_cache/user_cache/user_cache_detroitmi_menu_prod/";
        break;
    
      default:
        console.log('testing env');
        url = "https://apis.detroitmi.gov/data_cache/user_cache/user_cache_detroitmi_menu_dev/";
        baseURL = 'detroitmi.theneighborhoods.org';
        break;
    }

    fetch(url,{mode: 'cors'})
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
      console.log(data.updated);
      // console.log(controller.today);
      controller.cache = data.data.markup;
      console.log('load cache');
      controller.menu.render(data.data.markup, controller);
      console.log('time to update');
      controller.getTaxomy(baseURL, controller);
      // if(moment(data.updated).isBefore(moment(controller.today))){
      //   console.log('time to update');
      //   controller.getTaxomy(controller);
      // }else{
      //   console.log('load cache');
      //   controller.menu.render(data.data.markup, controller);
      // }
    });
  }
  getTaxomy(baseURL, controller){
    console.log(baseURL);
    let departments = new Promise((resolve, reject) => {
      let url = `http://${baseURL}/rest/menu/department-full?_format=hal_json`;
      return fetch(url,{mode: 'cors'})
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({name: 'DEPARTMENTS', data: data});
      });
    });
    let government = new Promise((resolve, reject) => {
      let url = `http://${baseURL}/rest/menu/government?_format=hal_json`;
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({name: 'GOVERNMENT', data: data});
      });
    });
    let howDoI = new Promise((resolve, reject) => {
      let url = `http://${baseURL}/rest/menu/interactions?_format=hal_json`;
      return fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        resolve({name: 'HOW DO I', data: data});
      });
    });
    Promise.all([departments, government, howDoI]).then(values => {
        // console.log(values); //one, two
        controller.menu.buildMenu(values, controller);
    }).catch(reason => {
      // console.log(controller);
      console.log('Error: loading from cache');
      console.log(reason);
      controller.menu.render(controller.cache, controller);
    });
  }
}
