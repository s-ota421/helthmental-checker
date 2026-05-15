async function goToInput() {
  const id = document.getElementById("user-id").value;
  if (!id) {
    alert("IDを入力してください");
    return;
  }

  try {
    const res = await fetch(`${GAS_URL}?type=user&id=${encodeURIComponent(id)}`);
    const data = await res.json();

    // IDが存在しない
    if (!data.id) {
      alert("IDが見つかりません");
      return;
    }

    // ステータスチェック
    if (data.status !== "入所中") {
      alert("現在ログインできません（ステータス：" + data.status + "）");
      return;
    }

    // ✅ 入所中 → 入力画面へ
    location.href = `input.html?id=${encodeURIComponent(id)}`;

  } catch (err) {
    alert("通信エラーが発生しました");
    console.error(err);
  }
}

 
