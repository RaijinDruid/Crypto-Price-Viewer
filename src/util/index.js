export default {
  formatCurrency: (string, decimals = null) => {
    let substringLength = string.includes(".") ? string.split(".")[1].length : 0;

    let localeString = Number(parseFloat(string)).toLocaleString("en-US", {
      minimumFractionDigits: decimals != null ? decimals : substringLength,
      maximumFractionDigits: decimals != null ? decimals : substringLength,
    });

    return localeString.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, "$1");
  },
};
