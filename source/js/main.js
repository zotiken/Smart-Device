/* eslint-disable new-cap, no-undef */
'use strict';
(function () {
  var HIDDEN = 'hidden';
  var VISIBLE = 'visible';
  var FLEX = 'flex';
  var NONE = 'none';
  var ESC = 27;
  var MASK = '+{7}(000)000-00-00';

  var EMPTY = '';

  var body = document.querySelector('body');
  var callBackBotton = document.querySelector('#callback_button');
  var popUp = document.querySelector('#popUp');
  var modalOverlay = document.querySelector('.modal__overlay');
  var modalClose = document.querySelector('.modal__close');

  var footerNav = document.querySelector('.nav_footer__navigation_list');
  var footerContacts = document.querySelector('.nav_footer__contacts');

  footerNav.querySelectorAll('ul').forEach(function (userItem) {
    userItem.classList.add(HIDDEN);
  });

  footerNav.querySelector('h3').classList.add(HIDDEN);

  footerContacts.querySelector('ul').classList.add(HIDDEN);
  footerContacts.querySelector('h3').classList.add(HIDDEN);

  body.classList.remove('no-js');

  var setState = function (item, action, param) {
    item.forEach(function (userItem) {
      userItem.classList[action](param);
    });
  };

  var accordionItems = [footerNav, footerContacts];
  accordionItems.forEach(function (item, i) {
    item.querySelector('h3').addEventListener('click', function (e) {

      var list = e.target.parentNode.querySelectorAll('ul');
      var classesElement = e.target.classList;

      if (classesElement[0] === HIDDEN) {
        classesElement.remove(HIDDEN);
        classesElement.add(VISIBLE);
        setState(list, 'remove', HIDDEN);
        setState(list, 'add', VISIBLE);
      } else {
        classesElement.remove(VISIBLE);
        classesElement.add(HIDDEN);
        setState(list, 'add', HIDDEN);
        setState(list, 'remove', VISIBLE);
      }

      var action = function (a, id) {
        if (id !== i) {
          a.querySelector('h3').classList.remove(VISIBLE);
          a.querySelector('h3').classList.add(HIDDEN);
          setState(a.querySelectorAll('ul'), 'add', HIDDEN);
          setState(a.querySelectorAll('ul'), 'remove', VISIBLE);
        }
      };
      accordionItems.map(function (r, index) {
        return action(r, index);
      });
    });
  });

  callBackBotton.addEventListener('click', function () {
    popUp.style.display = FLEX;
    popUp.querySelector('input[name="name"]').focus();
    body.style.overflow = 'hidden';
  });

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === ESC) {
      popUp.style.display = NONE;
      body.style.overflow = 'auto';
    }
  });

  modalOverlay.addEventListener('click', function () {
    popUp.style.display = NONE;
    body.style.overflow = 'auto';
  });

  modalClose.addEventListener('click', function () {
    popUp.style.display = NONE;
    body.style.overflow = 'auto';
  });

  document.querySelectorAll('input[name="phone"]').forEach(function (item) {
    IMask(item, {
      mask: MASK,
    });
  });

  document.querySelectorAll('form').forEach(function (form) {
    var content = form.id;
    var itemArray = localStorage.getItem(content)
      ? JSON.parse(localStorage.getItem(content))
      : {};

    form.querySelectorAll('[data-type="local"]').forEach(function (item) {
      if (localStorage.getItem(content)) {
        if (itemArray[item.name]) {
          item.value = itemArray[item.name];
        } else {
          item.value = EMPTY;
        }
      } else {
        item.value = EMPTY;
      }

      if (item.name === 'phone') {
        item.addEventListener('focus', function (e) {
          if (!e.target.value) {
            e.target.value = '+7(';
          }
        });
      }
      item.addEventListener('input', function (e) {
        itemArray[e.target.name] = e.target.value;
        localStorage.setItem(content, JSON.stringify(itemArray));
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      localStorage.removeItem(content);
      form.querySelectorAll('[data-type="local"]').forEach(function (item) {
        item.value = EMPTY;
      });
    });
  });
})();
