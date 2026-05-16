const GAS_URL = "https://script.google.com/macros/s/AKfycbxqqvWP2MzB-Yn-BruS08BrGh_TsI2YBy7yRcVptcWtSKlJapD1eGDv99DPruUVcEh--g/exec";

function getUserName(id) {
  return new Promise((resolve, reject) => {
    const callbackName = "jsonpCallback_" + Date.now();
    const timer = setTimeout(() => {
      delete window[callbackName];
      document.body.removeChild(script);
      reject(new Error("タイムアウト"));
    }, 10000);
    window[callbackName] = (data) => {
      clearTimeout(timer);
      delete window[callbackName];
      document.body.removeChild(script);
      resolve(data);
    };
    const script = document.createElement("script");
    script.src = GAS_URL +
      "?type=user&id=" + encodeURIComponent(id) +
      "&callback=" + callbackName;
    script.onerror = () => {
      clearTimeout(timer);
      delete window[callbackName];
      reject(new Error("読み込み失敗"));
    };
    document.body.appendChild(script);
  });
}
