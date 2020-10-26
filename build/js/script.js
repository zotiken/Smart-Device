/* eslint-disable new-cap, no-undef */
"use strict";
(function () {
  var HIDDEN = "hidden";
  var VISIBLE = "visible";
  var FLEX = "flex";
  var NONE = "none";
  var ESC = 27;
  var MASK = '+{7}(000)000-00-00';

  var EMPTY = "";

  var body = document.querySelector("body");
  var callBackBotton = document.querySelector("#callback_button");
  var popUp = document.querySelector("#popUp");
  var modalOverlay = document.querySelector(".modal__overlay");
  var modalClose = document.querySelector(".modal__close");

  var footerNav = document.querySelector(".nav_footer__navigation_list");
  var footerContacts = document.querySelector(".nav_footer__contacts");

  footerNav.querySelector("ul").classList.add(HIDDEN);
  footerNav.querySelector("h3").classList.add(HIDDEN);

  footerContacts.querySelector("ul").classList.add(HIDDEN);
  footerContacts.querySelector("h3").classList.add(HIDDEN);

  body.classList.remove("no-js");

  var collapseMake = function (block) {
    block.querySelector("h3").addEventListener("click", function (e) {
      if (e.target.classList[0] === HIDDEN) {
        e.target.classList.remove(HIDDEN);
        e.target.classList.add(VISIBLE);
        e.target.parentNode.querySelector("ul").classList.remove(HIDDEN);
        e.target.parentNode.querySelector("ul").classList.add(VISIBLE);
      } else {
        e.target.classList.remove(VISIBLE);
        e.target.classList.add(HIDDEN);
        e.target.parentNode.querySelector("ul").classList.remove(VISIBLE);
        e.target.parentNode.querySelector("ul").classList.add(HIDDEN);
      }
    });
  };

  collapseMake(footerNav);
  collapseMake(footerContacts);

  callBackBotton.addEventListener("click", function () {
    popUp.style.display = FLEX;
    popUp.querySelector('input[name="name"]').focus();
  });

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === ESC) {
      popUp.style.display = NONE;
    }
  });

  modalOverlay.addEventListener("click", function () {
    popUp.style.display = NONE;
  });

  modalClose.addEventListener("click", function () {
    popUp.style.display = NONE;
  });

  document.querySelectorAll('input[name="phone"]').forEach(function (item) {
    IMask(item, {
      mask: MASK,
    });
  });

  // ------------------------------------------------------------------

  document.querySelectorAll("form").forEach(function (form) {
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

      if (item.name === "phone") {
        item.addEventListener("focus", function (e) {
          if (!e.target.value) {
            e.target.value = "+7(";
          }
        });
      }
      item.addEventListener("input", function (e) {
        itemArray[e.target.name] = e.target.value;
        localStorage.setItem(content, JSON.stringify(itemArray));
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      localStorage.removeItem(content);
      form.querySelectorAll('[data-type="local"]').forEach(function (item) {
        item.value = EMPTY;
      });
    });
  });
})();
