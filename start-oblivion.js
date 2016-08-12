chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    file: '/oblivion.js'
  });
});

console.log('HURRRDURRR')