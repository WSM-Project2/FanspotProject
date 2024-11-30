// HTML 요소 참조
const productContainer = document.getElementById("product-container");

// JSON 데이터를 비동기적으로 가져오는 함수
async function loadProducts() {
    try {
        // JSON 파일을 가져옴
        const response = await fetch('/js/data.json');  // 파일 경로를 입력하세요
        const products = await response.json();

        // linkd가 true인 상품만 필터링
        const filteredProducts = products.filter(product => product.linkd === true);

        // 상품 데이터를 동적으로 추가하는 함수
        filteredProducts.forEach(product => {
            // 상품 카드 생성
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            // 이미지 요소 추가
            const productImage = document.createElement("img");
            productImage.src = `/img/${product.img}`;
            productImage.alt = product.name;
            productImage.classList.add("product-image");

            // 이름과 가격 텍스트 추가
            const productInfo = document.createElement("div");
            productInfo.classList.add("product-info");
            productInfo.innerHTML = `
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price}원</p>
            `;

            // 카드에 요소 추가
            productCard.appendChild(productImage);
            productCard.appendChild(productInfo);

            // 컨테이너에 카드 추가
            productContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error("상품 데이터를 불러오는 데 실패했습니다:", error);
    }
}

// 상품 데이터를 로드
loadProducts();