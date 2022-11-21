import { SYMBOL_EMPTY } from "constants.js";
import { isNaN, isNumber } from "lodash";

export const parseFloatNumber = (value) => {
  const floatValue = parseFloat(value);
  return !isNaN(floatValue) ? floatValue : "";
};

export const parseIntNumber = (value) => {
  const floatValue = parseInt(value, 10);
  return !isNaN(floatValue) ? floatValue : "";
};

export const pickCap24hrChangeColor = (val, formatNumber) => {
  if (!isNumber(val)) {
    return SYMBOL_EMPTY;
  } else if (val > 0) {
    return (
      <div className="d-inline-block text-success">
        <span className="d-inline-block font-xs app-arrow">&#9650;</span>
        {formatNumber(val / 100, {
          style: "percent",
          maximumFractionDigits: 2,
        })}
      </div>
    );
  } else if (val < 0) {
    return (
      <div className="text-danger">
        <span className="font-xs app-arrow">&#9660;</span>
        {formatNumber(val / 100, {
          style: "percent",
          maximumFractionDigits: 2,
        })}
      </div>
    );
  }
  return formatNumber(val / 100, {
    style: "percent",
    maximumFractionDigits: 2,
  });
};
