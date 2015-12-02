!function(exports) {

  'use strict';

  function replaceText(aElem, aText) {
    var newChild = document.createTextNode(aText);
    if (aElem.hasChildNodes()) {
      aElem.replaceChild(newChild, aElem.firstChild);
    } else {
      aElem.appendChild(newChild);
    }
  }

  function addText(aElem, aText) {
    return aElem.appendChild(document.createTextNode(aText));
  }

  function createElement(aType, aAttrs, aOptionalText) {
    var elem = document.createElement(aType);

    // Add all the requested attributes
    if (aAttrs){
      for (var i in aAttrs) {
        if (i.startsWith('data-')) {
          var dataElem = i.replace('data-', '');
          elem.dataset[dataElem] = aAttrs[i];
        } else {
          elem.setAttribute(i, aAttrs[i]);
        }
      }
    }

    if (aOptionalText) {
      addText(elem, aOptionalText);
    }

    return elem;
  }

  function createElementAt(aMainBody, aType, aAttrs, aOptionalText, aBefore) {
    var elem = createElement(aType, aAttrs, aOptionalText);

    if (!aBefore) {
      aMainBody.appendChild(elem);
    } else {
      aMainBody.insertBefore(elem, aBefore);
    }

    return elem;
  }

  function setEnabled(element, enabled) {
    var classList = element.classList;
    enabled ? classList.add('enabled') : classList.remove('enabled');
  }

  function getAncestorByTagName(el, tagName) {
    tagName = tagName.toUpperCase();
    if (el.tagName === tagName) {
      return el;
    } else {
      while (el.parentNode) {
        el = el.parentNode;
        if (el.tagName === tagName) {
          return el;
        }
      }
      return null;
    }
  }

  exports.HTMLElems = {
    addText: addText,
    replaceText: replaceText,
    createElement: createElement,
    createElementAt: createElementAt,
    isAction: function(aElem) {
      return ('action' in aElem.dataset);
    },
    setEnabled: setEnabled,
    getAncestorByTagName: getAncestorByTagName
  };

}(this);
