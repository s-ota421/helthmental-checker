let currentUser = null;
const params = new URLSearchParams(location.search);
const id = params.get("id");
console.log(id);

window.onload = async () => {
  if (id) {
    try {
      currentUser = await getUserName(id);
      console.log(currentUser);
      document.getElementById("current-user-name").textContent =
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

function createButtons(containerId, type) {
  const container = document.getElementById(containerId);
  for (let i = 1; i <= 10; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("circle-btn");
    if (i <= 1) {
      btn.classList.add("bad");
    } else if (i <= 5) {
      btn.classList.add("poor");
    } else if (i <= 8) {
      btn.classList.add("normal");
    } else {
      btn.classList.add("good");
    }
    btn.onclick = () => {
      state[type] = i;
      updateSelected(container, i);
      console.log(type, i);
    };
    container.appendChild(btn);
  }
}

function updateSelected(container, selectedValue) {
  container.querySelectorAll("button").forEach((btn) => {
    btn.classList.remove("selected");
    if (Number(btn.textContent) === selectedValue) {
      btn.classList.add("selected");
    }
  });
}

// 二重送信防止フラグ
let isSaving = false;

async function save() {
  if (isSaving) return;

  // バリデーション
  if (!state.physical || !state.mental || !state.sleep) {
    alert("すべての項目を選択してください");
    return;
  }

  isSaving = true;

  const notes = document.getElementById("notes").value;
  const symptomValue = document.getElementById("symptom-select").value;

  const record = {
    date: new Date().toLocaleDateString("ja-JP"),
    id: id,
    name: currentUser.name,
    physical: state.physical,
    mental: state.mental,
    sleep: state.sleep,
    symptom: symptomValue,
    notes: notes
  };

  try {
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbxqqvWP2MzB-Yn-BruS08BrGh_TsI2YBy7yRcVptcWtSKlJapD1eGDv99DPruUVcEh--g/exec",
      {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(record)
      }
    );
    const result = await res.json();

    if (result.status === "updated") {
      alert("上書き保存しました。今日も一日お疲れさまです。");
    } else {
      alert("保存しました。今日も一日お疲れさまです。");
    }
    console.log(record);
  } catch (err) {
    console.error(err);
    alert("保存に失敗しました。もう一度お試しください。");
  } finally {
    isSaving = false;
  }
}

createButtons("physical-buttons", "physical");
createButtons("mental-buttons", "mental");
createButtons("sleep-buttons", "sleep");

document.getElementById("graph-btn").onclick = () => {
  console.log("graphへ:", id);
  location.href = "graph.html?id=" + encodeURIComponent(id);
};
