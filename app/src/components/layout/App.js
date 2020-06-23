import React from "react";
import MainStage from "./MainStage";
import BottomBar from "./BottomBar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectors } from "../../reducers";
import Modal from "./Modal";
import CCDBSelector from "../selectors/CCDBSelector";

const App = ({ modal }) => {
  return (
    <div>
      <MainStage />
      <BottomBar />
      {modal ? (
        <Modal>
          <CCDBSelector title="Fetch Occupancy Map" />
        </Modal>
      ) : null}
    </div>
  );
};

App.propTypes = {
  modal: PropTypes.bool
};

const mapStateToProps = state => ({
  modal: selectors.isModalVisible(state)
});

export default connect(mapStateToProps)(App);
