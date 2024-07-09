import React from "react";
import Devices from "./devices";
import General from "./general";
import Scripts from "./scripts";

function Mainer() {
  return (
    <main className="main">
      <General />
      <Scripts />
      <Devices />
    </main>
  );
}

export default Mainer;
