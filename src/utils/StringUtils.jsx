const dataTypes = {
  number: "number",
  text: "text",
  date: "date",
};

function convertToNormalText(camelCaseString) {
  return capitalize(camelCaseString.replace(/([A-Z])/g, " $1"));
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export { dataTypes, convertToNormalText, capitalize };
