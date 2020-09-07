const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// export default capitalize;
module.exports = {
  capitalize, // capitalize : capitalize와 동일
};
