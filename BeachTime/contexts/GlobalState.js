import React from "react";

const GlobalState = React.createContext([
  {},
  () => {
    /* state setter */
  },
]);

export default GlobalState;
