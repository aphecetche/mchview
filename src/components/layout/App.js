import React from "react";
import MainStage from "./MainStage";
import BottomBar from "./BottomBar";
import styles from "./app.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectors } from "../../reducers";
import Modal from "./Modal";
import CCDBSelector from "../selectors/CCDBSelector";

const App = ({ modal }) => {
  return (
    <div className={styles.app}>
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

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
