import React from "react";
import Spinner from "../Spinner.gif";

const Loading = () => {
  return (
    <div className="text-center my-3">
      <img className="my-3" src={Spinner} alt="loading.." />
    </div>
  );
}

export default Loading;
