import React from "react";
import { DEFAULT_MAX_VERSION } from "tls";

import "./header.css";

export const DefaultHeader: React.FC<{
  placeholder: string;
}> = ({ placeholder }) => {
  return (
    <div className="app-container-header">
      <div className="app-container-tittle"></div>
    </div>
  );
};
