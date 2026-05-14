let currentUser = null;
const params =
  new URLSearchParams(location.search);
const id = params.get("id");
console.log(id);

window.onload = async () => {

  if (id) {

    try {

      currentUser =
        await getUserName(id);

         console.log(currentUser);

      document.getElementById(
        "current-user-name"
      ).textContent =
        currentUser.name + " さん";

    } catch (err) {

      console.error(err);

      alert("利用者情報取得失敗");
    }

  } else {

    alert("ログインし直してください");

    location.href = "index.html";
  }
};

const state = {
  physical: null,
  mental: null,
  sleep: null
};

    
// 0〜10ボタン生成
function createButtons(containerId, type) {
  const container = document.getElementById(containerId);

  for (let i = 0; i <= 10; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("circle-btn")
    // 最初から色をつける
    if (i <= 1) {
      btn.classList.add("bad");
    } else if (i <= 5) {
      btn.classList.add("poor");
    } else if (i <= 8) {
      btn.classList.add("normal");
    } else if (i <= 10) {
      btn.classList.add("good");
    } 

    btn.onclick = () => {
      switch (type) {
        case "physical":
         state.physical = i;
        break;

       case "mental":
         state.mental = i;
       break;

       case "sleep":
        state.sleep = i;
       break;
}
    
      updateSelected(container, i);

      console.log(type, i);
    };

    container.appendChild(btn);
  }
}

// 見た目更新だけにする
function updateSelected(container, selectedValue) {

  const buttons = container.querySelectorAll("button");

  buttons.forEach((btn) => {
     btn.classList.remove("selected");
    const value = Number(btn.textContent);

    // 選択されたボタンだけ色追加
    if (value === selectedValue) {
        btn.classList.add("selected");
    }
  });
}
// 保存
function save() {

  const notes = document.getElementById("notes").value;
  
  let symptomValue = document.getElementById("symptom-select").value; // セレクトボックスのIDに合わせてください
 

  const record = {
    date: new Date().toLocaleDateString("ja-JP"),
    id:id,
    name: currentUser.name,
    physical: state.physical,
    mental: state.mental,
    sleep: state.sleep,
    symptom: symptomValue,
    notes: notes
  };

  
  fetch("https://script.google.com/macros/s/AKfycbxqqvWP2MzB-Yn-BruS08BrGh_TsI2YBy7yRcVptcWtSKlJapD1eGDv99DPruUVcEh--g/exec", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(record)
  });

  console.log(record);

  alert("保存しました。今日も一日お疲れさまです。");
}

// 初期化
createButtons("physical-buttons", "physical");
createButtons("mental-buttons", "mental");
createButtons("sleep-buttons", "sleep");

// グラフ画面へ
document.getElementById(
  "graph-btn"
).onclick = () => {

  console.log("graphへ:", id);

  location.href =
    "graph.html?id=" +
    encodeURIComponent(id);
};
