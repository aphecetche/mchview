const m = require('mithril');

// const DetectionElement = require('./views/DetectionElement.js');

const Help = {
  /** Default view
   * @return {object} a default H1
   * */
  view: function() {
    return m('h1', 'help');
  }
};

const root = document.body;

m.route(root, '/help', {
  '/help': Help,
  '/de': {
  /** Default view
   * @return {object} a default p
   * */
    view: function() {
      return m('p', 'de');
    }
  }
});
