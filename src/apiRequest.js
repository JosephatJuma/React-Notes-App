const apiRequest = async (url = "", OptionObj = null, errMsg = null) => {
  try {
    const response = await fetch(url, OptionObj);
    if (!response.ok) throw Error("Please reload the app");
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
};
export default apiRequest;
