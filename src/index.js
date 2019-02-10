import m from 'mithril';
import TopBar from './views/TopBar';
import MchViewPort from './views/MchViewPort';

const Header = {
  view: () => {
    return m(TopBar, 'header');
  }
};

const mchviewApp = {
  view: () => {
    return m('mchview',
      m(Header),
      m(MchViewPort));
  }
};

m.mount(document.body, mchviewApp);
