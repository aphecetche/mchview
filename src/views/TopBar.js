import './topbar.css';
import m from 'mithril';
import OutlineSelector from './OutlineSelector';
import ElementSelector from './ElementSelector';
const TopBar = {
  /** Default view
   * @return {vnode} the top bar UI
   * */
  view: function() {
    return m('header', {class: 'topbar'}, m(OutlineSelector),
      m(ElementSelector));
  }
};

export default TopBar;
