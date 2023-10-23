export const EnterHelper = (key, run) => {
  if (key.keyCode === 13) {
    run();
  }
};
