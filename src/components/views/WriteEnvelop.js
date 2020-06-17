import React from "react";
import { useSelector } from "react-redux";
import useEnvelop from "../../hooks/useEnvelop";
import { encode, isSpecific } from "../../categories";

const saveToClient = (id, data) => {
  console.log("saveToClient id=", id, " ", encode(id), " ", isSpecific(id));
  const fileData = JSON.stringify(data);
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = encode(id) + ".json";
  link.href = url;
  link.click();
};

const WriteEnvelop = ({ id }) => {
  console.log(encode(id));
  const { isLoading } = useEnvelop(id);

  const data = useSelector(state => state.envelop);

  if (!isLoading && Object.keys(data).length) {
    saveToClient(id, data);
  }

  return isLoading ? (
    <p>loading</p>
  ) : (
    <pre>Got data : {JSON.stringify(data, null, 4)}</pre>
  );
};

export default WriteEnvelop;
