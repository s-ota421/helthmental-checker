  const GAS_URL = "https://script.google.com/macros/s/AKfycbxqqvWP2MzB-Yn-BruS08BrGh_TsI2YBy7yRcVptcWtSKlJapD1eGDv99DPruUVcEh--g/exec";
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('name');

    // 戻るボタンの設定
    document.getElementById('back-btn').onclick = () => {
      location.href = 'input.html?name=' + encodeURIComponent(userName);
    };

    // ライブラリの読み込みを待ってから開始
    if (typeof google !== 'undefined') {
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(init);
    } else {
      document.getElementById('curve_chart').innerHTML = "ライブラリの読み込みに失敗しました。再読み込みしてください。";
    }

    function init() {
      if (!userName) {
        alert("名前が特定できません");
        location.href = "index.html";
        return;
      }
      document.getElementById('current-name').textContent = userName;
      fetchData();
    }

    function fetchData() {
      fetch(`${GAS_URL}?name=${encodeURIComponent(userName)}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            drawChart(data);
          } else {
            document.getElementById('curve_chart').innerHTML = "データがまだありません";
          }
        })
        .catch(err => {
          document.getElementById('curve_chart').innerHTML = "通信エラー";
        });
    }

    function drawChart(rows) {
      const chartData = [['日付', '体調', 'メンタル', '睡眠']];
      rows.slice(-14).forEach(row => {
        const dateObj = new Date(row[0]);
        const shortDate = (dateObj.getMonth() + 1) + "/" + dateObj.getDate();
        chartData.push([shortDate, Number(row[2]), Number(row[3]), Number(row[4])]);
      });

      const data = google.visualization.arrayToDataTable(chartData);
      const chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
      chart.draw(data, {
        curveType: 'function',
        legend: { position: 'bottom' },
        vAxis: { minValue: 0, maxValue: 10 },
        colors: ['#ff4b5c', '#2196f3', '#4caf50'],
        chartArea: { width: '85%', height: '70%' }
      });
    }