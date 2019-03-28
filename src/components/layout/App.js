import React from "react";
import TopBar from "./TopBar";
import MainStage from "../layout/mainstage.js";
import BottomBar from "./BottomBar";
import "./app.css";

// immport Modal from "./views/Modal";
// import ShowModal from "./models/ShowModal";
//
// const mchviewApp = {
//   view: () => {
//     if (ShowModal.visible) {
//       return m("mchview", m(Header), m(Main), m(Footer), m(Modal));
//     }
//     return m("mchview", m(Header), m(Main), m(Footer));
//   }
// };
//

const App = () => {
  return (
    <div className="app">
      <TopBar />
      {/* <MainStage /> */}
      {/* <BottomBar /> */}
    </div>
  );
};

export default App;
