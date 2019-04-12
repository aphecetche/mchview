import React from "react";
import PropTypes from "prop-types";
import styles from "./verticalopenclosebutton.css";
import classNames from "classnames";

const VerticalOpenCloseButton = ({ isOpening, onClick }) => {
  let btnClass = classNames({
    [styles.btn]: true,
    [styles.open]: isOpening,
    [styles.close]: !isOpening
  });
  return <button className={btnClass} onClick={() => onClick()} />;
};

VerticalOpenCloseButton.propTypes = {
  isOpening: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};
export default VerticalOpenCloseButton;
