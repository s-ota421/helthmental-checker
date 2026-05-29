const GAS_URL = "https://script.google.com/macros/s/AKfycbzmvCnlGFEDM6u4lLuWAJjxGebucapTzd1WY2SpJxC49rh5EhLRmAhIxtLxCQC-gghVNg/exec";

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
