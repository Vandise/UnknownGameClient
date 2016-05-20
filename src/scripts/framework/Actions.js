export default names => {
  return names.reduce((memo, name) => {
    memo[name] = name; return memo;
  }, {});
};