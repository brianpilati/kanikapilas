module.exports = {
  timer(startTime) {
    return `${(new Date() - startTime) / 1000} seconds`;
  }
};
