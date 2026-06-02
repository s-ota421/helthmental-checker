const GAS_URL = "https://script.google.com/macros/s/AKfycbyDC4-v8DXFlOcdi2MBMJL5Zm2fGc4INRHTj-CEyQ0H-q-V4nBb9Xf2qNplu5ww3on6qw/exec";

async function getUserName(id) {
  const res = await fetch(GAS_URL + "?type=user&id=" + encodeURIComponent(id));
  const data = await res.json();
  return data;
}

async function getConditionData(id) {
  const now = new Date();
  
  // 当月
  const month1 = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");
  
  // 先月
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const month2 = prev.getFullYear() + "-" + String(prev.getMonth() + 1).padStart(2, "0");

  // 当月と先月を両方取得
  const [res1, res2] = await Promise.all([
    fetch(GAS_URL + "?type=monthly&userId=" + encodeURIComponent(id) + "&month=" + month1),
    fetch(GAS_URL + "?type=monthly&userId=" + encodeURIComponent(id) + "&month=" + month2)
  ]);

  const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

  // 結合して日付順に並べ、過去14日間に絞る
  const all = [...data2, ...data1];
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(now.getDate() - 14);

  return all
    .filter(row => new Date(row.date) >= twoWeeksAgo)
    .map(row => [
      row.date, row.id, row.name,
      row.physical, row.mental, row.sleep
    ]);
}
