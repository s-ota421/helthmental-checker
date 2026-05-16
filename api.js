const GAS_URL = "https://script.google.com/macros/s/AKfycbyDC4-v8DXFlOcdi2MBMJL5Zm2fGc4INRHTj-CEyQ0H-q-V4nBb9Xf2qNplu5ww3on6qw/exec";

async function getUserName(id) {
  const res = await fetch(GAS_URL + "?type=user&id=" + encodeURIComponent(id));
  const data = await res.json();
  return data;
}

