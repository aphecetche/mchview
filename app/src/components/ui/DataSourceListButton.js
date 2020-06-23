import React from "react";
import PropTypes from "prop-types";

const DataSourceListButton = ({ listDataSources }) => {
  return <button onClick={() => listDataSources()}>Data Source List</button>;
};

DataSourceListButton.propTypes = {
  listDataSources: PropTypes.func.isRequired
};

export default DataSourceListButton;
