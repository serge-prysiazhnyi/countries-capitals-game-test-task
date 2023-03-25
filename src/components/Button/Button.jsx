import React, { memo } from "react";

export const Button = memo(({ item, color, handleClick }) => (
  <button style={{ backgroundColor: color }} onClick={() => handleClick(item)}>
    {item}
  </button>
));
