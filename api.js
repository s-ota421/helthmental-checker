const GAS_URL = "https://script.google.com/macros/s/AKfycbxqqvWP2MzB-Yn-BruS08BrGh_TsI2YBy7yRcVptcWtSKlJapD1eGDv99DPruUVcEh--g/exec";

// 利用者取得
function getUserName(id) {
  return new Promise((resolve, reject) => {
    // コールバック関数名をユニークに
    const callbackName = "jsonpCallback_" + Date.now();

    // タイムアウト処理
    const timer = setTimeout(() => {
      delete window[callbackName];
      document.body.removeChild(script);
      reject(new Error("タイムアウト"));
    }, 10000);

    // コールバック関数を定義
    window[callbackName] = (data) => {
      clearTimeout(timer);
      delete window[callbackName];
      document.body.removeChild(script);
      resolve(data);
    };

    // scriptタグでリクエスト
    const script = document.createElement("script");
    script.src =
      "https://script.google.com/macros/s/AKfycbxqqvWP2MzB-Yn-BruS08BrGh_TsI2YBy7yRcVptcWtSKlJapD1eGDv99DPruUVcEh--g/exec" +
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
