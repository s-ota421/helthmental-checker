const params =
  new URLSearchParams(location.search);

const id = params.get("id");

window.onload = async () => {

  if (!id) {
    alert("ID取得失敗");
    return;
  }

  // 名前取得
  const currentUser =
    await getUserName(id);

  document.getElementById(
    "current-name"
  ).textContent =
    currentUser.name + " さん";

  // 戻るボタン
  document.getElementById(
    "back-btn"
  ).onclick = () => {

    location.href =
      "input.html?id=" +
      encodeURIComponent(id);
  };

  // Google Charts
  if (typeof google !== 'undefined') {

    google.charts.load(
      'current',
      { packages:['corechart'] }
    );

    google.charts.setOnLoadCallback(fetchData);

  } else {

    document.getElementById(
      'curve_chart'
    ).innerHTML =
      "ライブラリ読み込み失敗";
  }
};

async function fetchData() {

  try {

    // api.js の関数
    const data =
      await getConditionData(id);

    if (data && data.length > 0) {

      drawChart(data);

    } else {

      document.getElementById(
        'curve_chart'
      ).innerHTML =
        "データがまだありません";
    }

  } catch(err) {

    console.error(err);

    document.getElementById(
      'curve_chart'
    ).innerHTML =
      "通信エラー";
  }
}

function drawChart(rows) {

  const chartData = [
    ['日付', '体調', 'メンタル', '睡眠']
  ];

  rows.slice(-14).forEach(row => {

    const dateObj =
      new Date(row[0]);

    const shortDate =
      (dateObj.getMonth() + 1)
      + "/"
      + dateObj.getDate();

    chartData.push([
      shortDate,
      Number(row[2]),
      Number(row[3]),
      Number(row[4])
    ]);
  });

  const data =
    google.visualization
    .arrayToDataTable(chartData);

  const chart =
    new google.visualization
    .LineChart(
      document.getElementById('curve_chart')
    );

  chart.draw(data, {
    curveType: 'function',
    legend: { position: 'bottom' },
    vAxis: {
      minValue: 0,
      maxValue: 10
    },
    colors: [
      '#ff4b5c',
      '#2196f3',
      '#4caf50'
    ],
    chartArea: {
      width: '85%',
      height: '70%'
    }
  });
}
