function goToInput() {

    const id =
        document.getElementById("user-id").value;

    if (!id) {

        alert("IDを入力してください");

        return;
    }

    // IDをURLに付けて入力画面へ移動
    location.href =
        `input.html?id=${encodeURIComponent(id)}`;
}

 