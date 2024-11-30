document.addEventListener("DOMContentLoaded", async () => {
    const famousJsonUrl = "/js/famous-person.json"; // 첫 번째 JSON 파일 경로
    const goodsJsonUrl = "/js/data.json"; // 두 번째 JSON 파일 경로

    try {
        const famousResponse = await fetch(famousJsonUrl);
        const goodsResponse = await fetch(goodsJsonUrl);

        const famousData = await famousResponse.json();
        const goodsData = await goodsResponse.json();

        // 유명인 섹션에 데이터 추가
        const famousContainer = document.querySelector(".famous-person-item");
        famousData.forEach(famous => {
            const famousCard = document.createElement("div");
            famousCard.classList.add("card");
            famousCard.innerHTML = `
                <img src="/img/${famous.img}" alt="${famous.name}" class="card-img">
                <h3 class="card-title">${famous.name}</h3>
            `;
            famousContainer.appendChild(famousCard);
        });

        // 새로운 상품 섹션과 추천 상품 섹션 컨테이너 가져오기
        const newGoodsContainer = document.querySelector(".new-goods-item");
        const pushContainer = document.querySelector(".push-item");

        // JSON 데이터의 상태에 따라 상품 구분
        goodsData.forEach(goods => {
            const goodsCard = document.createElement("div");
            goodsCard.classList.add("card");
            goodsCard.innerHTML = `
                <img src="/img/${goods.img}" alt="${goods.name}" class="card-img">
                <h3 class="card-title">${goods.name}</h3>
                <p class="card-price">₩${goods.price}</p>
                <p class="card-user">판매자: ${goods.user}</p>
            `;

            // 상품 상태에 따라 섹션에 추가
            if (goods.status === "new") {
                newGoodsContainer.appendChild(goodsCard);
            } else {
                pushContainer.appendChild(goodsCard);
            }

            // 클릭 이벤트로 모달 표시
            goodsCard.addEventListener("click", () => {
                openModal(goods);
            });
        });
    } catch (error) {
        console.error("Error fetching JSON data:", error);
    }
});

// 모달 열기 함수 (판매자 아이콘 포함)
function openModal(product) {
    const modal = document.getElementById("productModal");
    modal.querySelector(".modal-title").textContent = product.name;
    modal.querySelector(".modal-image").src = `/img/${product.img}`;
    modal.querySelector(".modal-description").textContent = product.info;
    modal.querySelector(".price-value").textContent = `₩${product.price}`;

    // 판매자 정보 추가
    modal.querySelector(".modal-user").innerHTML = `
        <i class="bi bi-person-circle" style="margin-right: 8px;"></i> ${product.user}
    `;

    modal.style.display = "block";

    // 모달 닫기 이벤트
    document.getElementById("closeModal").addEventListener("click", () => {
        modal.style.display = "none";
    });
}