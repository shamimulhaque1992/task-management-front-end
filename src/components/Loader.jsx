import React from "react";
import { CirclesWithBar, Vortex } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="mx-auto max-w-5xl p-6 pb-36 bg-gray-50 flex justify-center items-center h-screen">
      <CirclesWithBar
        height="100"
        width="100"
        color="#ff8100"
        outerCircleColor="#ffffff"
        innerCircleColor="#ffffff"
        barColor="rgba(255, 94, 0, 0.88)"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
