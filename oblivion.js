
if (typeof lastElement === 'undefined') { var lastElement = ''; }
if (typeof lastParent === 'undefined') { var lastParent = ''; }

console.log('Entering Oblivion v.0.1');
function clickAway(targetElement) {
  console.log('clickAway()');

  lastElement = targetElement;
  lastEl = document.getElementById(targetElement.id);
  console.log('lastEL', lastEl);
  lastParent = targetElement.parentNode;

  targetElement.parentNode.removeChild(targetElement);
}

function removeListeners() {
  setTimeout(function() { document.removeEventListener("click", fnLeftClick, false); }, 10);
  setTimeout(function() { document.removeEventListener("contextmenu", fnRightClick, false); }, 10);
}

function removeListenersIe() {
  setTimeout(function() { document.detachEvent("click", fnLeftClick, false); }, 10);
  setTimeout(function() { document.detachEvent("contextmenu", fnRightClick, false); }, 10);
}

if (document.addEventListener ){
    console.log('addEventListener()');

    // Click
    var fnLeftClick = function(event) {
      event.preventDefault();
      var targetElement = event.target || event.srcElement;
      console.log(targetElement);
      console.log(targetElement.id);
      clickAway(targetElement);
      removeListeners();
    }
    document.addEventListener("click", fnLeftClick, false);

    // Right Click
    var fnRightClick = function(event) {
      event.preventDefault();
      console.log('RIGHT click');
      console.log('lastParent:', lastParent);
      console.log('lastElement:', lastElement);

      if (lastParent !== null && lastElement !== null) {
        lastParent.addChild(lastElement);
      }
      removeListeners()
      return false;
    }
    document.addEventListener("contextmenu", fnRightClick, false);

} else if (document.attachEvent) {
    console.log('attachEvent()');

    // Click
    var fnLeftClick = function(event) {
      event.preventDefault();
      var targetElement = event.target || event.srcElement;
      console.log(targetElement);
      clickAway(targetElement);
      removeListenersIe()
    }
    document.attachEvent("onclick", fnLeftClick, false);

    // Right Click
    var fnRightClick = function(event) {
      event.preventDefault();
      if (lastParent !== null && lastElement !== null) {
        lastParent.addChild(lastElement);
      }
      removeListenersIe();
      return false;
    }
    document.attachEvent("contextmenu", fnRightClick, false);
}
