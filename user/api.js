const GAS_URL = "https://script.google.com/macros/s/AKfycbxqqvWP2MzB-Yn-BruS08BrGh_TsI2YBy7yRcVptcWtSKlJapD1eGDv99DPruUVcEh--g/exec";
async function getUserName(id) {

  const res =
    await fetch(
      `${GAS_URL}?type=user&id=${id}`
    );

  return await res.json();
}
