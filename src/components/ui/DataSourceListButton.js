import styles from "./datasourcelistbutton.css";
import React from "react";
import PropTypes from "prop-types";

const DataSourceListButton = ({ listDataSources }) => {
  return (
    <button
      className={styles.dataSourceListButton}
      onClick={() => listDataSources()}
    >
      Data Source List
    </button>
  );
};

DataSourceListButton.propTypes = {
  listDataSources: PropTypes.func.isRequired
};

export default DataSourceListButton;
