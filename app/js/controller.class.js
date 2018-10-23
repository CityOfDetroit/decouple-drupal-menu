
import 'babel-polyfill';
import 'isomorphic-fetch';
import Menu from './menu.class.js';
const moment = require('moment');
export default class Controller {
  constructor() {
    this.taxonomy = {
      departments: null,
      government: null,
    };
    this.menu = new Menu();
    this.today = moment().add(1, 'hours').format('YYYY-MM-DDTHH:mm:ss');
    this.cache = null;
    this.language = 'Arabic';
    this.languageCode = 'ar';
    this.init();
  }

  init() {
    // console.log(controller.today);
    // controller.getTaxomy(controller);
    const controller = this;
    const baseURL = window.location.host;
    const path = window.location.pathname;
    let url;

    switch (true) {
      case path.includes('/ar'):
        controller.languageCode = 'ar';
        controller.language = 'Arabic';
        url = 'https://apis.detroitmi.gov/data_cache/user_cache/user_cache_detroitmi_menu_prod_ar/';
        break;
      case path.includes('/bn'):
        controller.languageCode = 'bn';
        controller.language = 'Bengali';
        url = 'https://apis.detroitmi.gov/data_cache/user_cache/user_cache_detroitmi_menu_prod_bn/';
        break;
      case path.includes('/es'):
        controller.languageCode = 'es';
        controller.language = 'Spanish';
        url = 'https://apis.detroitmi.gov/data_cache/user_cache/user_cache_detroitmi_menu_prod_es/';
        break;
      default:
        controller.languageCode = 'en';
        controller.language = 'English';
        url = 'https://apis.detroitmi.gov/data_cache/user_cache/user_cache_detroitmi_menu_prod/';
        break;
    }

    // console.log(url);
    // console.log(controller.language);
    fetch(url, { mode: 'cors' })
      .then(resp => resp.json()) // Transform the data into json
      .then((data) => {
        // console.log(data);
        // console.log(data.updated);
        // console.log(controller.today);
        controller.cache = data.data.markup;
        // console.log('load cache');
        controller.menu.render(data.data.markup, controller);
        // console.log('time to update');
        controller.getTaxomy(baseURL, controller);
      });
  }

  getTaxomy(baseURL, controller) {
    // console.log(baseURL);
    const departments = new Promise((resolve, reject) => {
      const url = `http://${baseURL}/rest/menu/department-full?_format=hal_json`;
      return fetch(url, { mode: 'cors' })
        .then(resp => resp.json()) // Transform the data into json
        .then((data) => {
          resolve({ name: 'DEPARTMENTS', data });
        });
    });
    const government = new Promise((resolve, reject) => {
      const url = `http://${baseURL}/rest/menu/government?_format=hal_json`;
      return fetch(url)
        .then(resp => resp.json()) // Transform the data into json
        .then((data) => {
          resolve({ name: 'GOVERNMENT', data });
        });
    });
    const howDoI = new Promise((resolve, reject) => {
      const url = `http://${baseURL}/rest/menu/interactions?_format=hal_json`;
      return fetch(url, { mode: 'cors' })
        .then(resp => resp.json()) // Transform the data into json
        .then((data) => {
          resolve({ name: 'HOW DO I', data });
        });
    });
    Promise.all([departments, government, howDoI]).then((values) => {
      // console.log(values); //one, two
      controller.menu.buildMenu(values, controller);
    }).catch((reason) => {
      // console.log(controller);
      // console.log('Error: loading from cache');
      // console.log(reason);
      controller.menu.render(controller.cache, controller);
    });
  }
}
