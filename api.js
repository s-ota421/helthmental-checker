const GAS_URL = "https://script.google.com/macros/s/AKfycbyDC4-v8DXFlOcdi2MBMJL5Zm2fGc4INRHTj-CEyQ0H-q-V4nBb9Xf2qNplu5ww3on6qw/exec";

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
