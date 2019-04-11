import React, { useState } from "react";
import PropTypes from "prop-types";

const FetchButton = ({ fetcher, finalizer }) => {
  let [isLoading, setIsLoading] = useState(false);
  let [isError, setIsError] = useState(false);

  return (
    <button
      className={"fetch" + (isLoading ? " loading" : "")}
      onClick={() => {
        setIsLoading(true);
        return fetcher().then(
          () => {
            setIsLoading(false);
            finalizer();
          },
          () => {
            console.log("problem");
            setIsError(true);
            setIsLoading(false);
          }
        );
      }}
    >
      {isLoading ? "Loading" : isError ? "Error" : "Fetch"}
    </button>
  );
};

FetchButton.propTypes = {
  fetcher: PropTypes.func.isRequired,
  finalizer: PropTypes.func.isRequired
};

export default FetchButton;
