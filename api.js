const GAS_URL = "https://script.google.com/macros/s/AKfycbxqqvWP2MzB-Yn-BruS08BrGh_TsI2YBy7yRcVptcWtSKlJapD1eGDv99DPruUVcEh--g/exec";
//利用者取得
async function getUserName(id) {

  const res =
    await fetch(
      `${GAS_URL}?type=user&id=${id}`
    );

  return await res.json();
}
??体調データ取得
async function getConditionData(id) {

  const res =
    await fetch(
      `${GAS_URL}?type=condition&id=${id}`
    );

  return await res.json();
}
