const GAS_URL = "https://script.google.com/macros/s/AKfycbyDC4-v8DXFlOcdi2MBMJL5Zm2fGc4INRHTj-CEyQ0H-q-V4nBb9Xf2qNplu5ww3on6qw/exec";

async function getUserName(id) {
  const res = await fetch(GAS_URL + "?type=user&id=" + encodeURIComponent(id));
  const data = await res.json();
  return data;
}

async function getConditionData(id) {
  const now = new Date();
  const month = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");
  const res = await fetch(
    GAS_URL + "?type=monthly&userId=" + encodeURIComponent(id) + "&month=" + month
  );
  const data = await res.json();
  return data.map(row => [
    row.date, row.id, row.name,
    row.physical, row.mental, row.sleep
  ]);
}
