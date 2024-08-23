async function getUser() {
    try {
        const res = await axios.get("/users"); // 서버에서 사용자 목록을 가져옵니다.
        const users = res.data; // 사용자 목록을 변수에 저장합니다.
        const list = document.getElementById("list"); // HTML에서 id가 "list"인 요소를 찾습니다.
        list.innerHTML = ""; // 기존의 목록을 비웁니다.

        // 사용자 목록을 순회하면서 HTML 요소를 생성합니다.
        Object.keys(users).map(function (key) {
            const userDiv = document.createElement("div"); // 사용자 정보를 담을 div를 만듭니다.
            const span = document.createElement("span"); // 사용자 이름을 담을 span을 만듭니다.
            span.textContent = users[key]; // 사용자 이름을 span에 넣습니다.

            // 수정 버튼을 만듭니다.
            const edit = document.createElement("button");
            edit.textContent = "수정";
            edit.addEventListener("click", async () => {
                const name = prompt("바꿀 이름을 입력하세요"); // 새 이름을 입력 받습니다.
                if (!name) {
                    return alert("이름을 반드시 입력하셔야 합니다"); // 이름이 없으면 경고합니다.
                }
                try {
                    await axios.put("/user/" + key, { name }); // 서버에 새 이름을 업데이트합니다.
                    getUser(); // 사용자 목록을 다시 불러옵니다.
                } catch (err) {
                    console.error(err); // 오류가 발생하면 콘솔에 출력합니다.
                }
            });

            // 삭제 버튼을 만듭니다.
            const remove = document.createElement("button");
            remove.textContent = "삭제";
            remove.addEventListener("click", async () => {
                try {
                    await axios.delete("/user/" + key); // 서버에서 사용자 삭제를 요청합니다.
                    getUser(); // 사용자 목록을 다시 불러옵니다.
                } catch (err) {
                    console.error(err); // 오류가 발생하면 콘솔에 출력합니다.
                }
            });

            // span, 수정 버튼, 삭제 버튼을 div에 추가하고, div를 list에 추가합니다.
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);

            console.log(res.data); // 콘솔에 사용자 목록을 출력합니다.
        });
    } catch (err) {
        console.error(err); // 오류가 발생하면 콘솔에 출력합니다.
    }
}

window.onload = getUser;
document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지합니다.
    const name = e.target.username.value; // 입력된 이름을 가져옵니다.
    if (!name) {
        return alert("이름을 입력하세요"); // 이름이 없으면 경고합니다.
    }
    try {
        await axios.post("/user", { name }); // 서버에 새 사용자 추가를 요청합니다.
        getUser(); // 사용자 목록을 다시 불러옵니다.
    } catch (err) {
        console.error(err); // 오류가 발생하면 콘솔에 출력합니다.
    }
    e.target.username.value = ""; // 입력 필드를 비웁니다.
});
