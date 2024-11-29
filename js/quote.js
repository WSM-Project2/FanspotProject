document.querySelector('.q-search-button').addEventListener('click', function() {
    const searchQuery = document.querySelector('.q-search-input').value.trim();
    
    // 검색어가 비어있지 않다면
    if (searchQuery) {
        // start-container 숨기기
        document.querySelector('.start-container').style.display = 'none';
        
        // res-container 보이기
        document.querySelector('.res-container').style.display = 'block';
        
        // 검색어 처리 (예: 검색 결과에 해당하는 데이터 로딩)
        handleSearchResults(searchQuery);
        
        // 최근 검색 목록에 추가
        addRecentSearch(searchQuery);
    }
});

// 로컬 JSON 파일 로드 및 렌더링
async function renderPrices() {
    try {
        const response = await fetch("/js/quote.json"); // 로컬 JSON 파일 경로
        if (!response.ok) throw new Error("JSON 파일을 불러올 수 없습니다.");

        const jsonData = await response.json();

        // 실시간 시세 리스트 렌더링
        const realtimeList = document.querySelector(".realtime-prices-list");
        const realtimeData = jsonData.find(item => item.category === "실시간 시세조회");
        if (realtimeData) {
            realtimeData.data.forEach(item => {
                const listItem = document.createElement("li");
                listItem.textContent = `${item.no}. ${item.name}`;
                realtimeList.appendChild(listItem);
            });
        }

        // 인기 시세 리스트 렌더링
        const popularList = document.querySelector(".popular-prices-list");
        const popularData = jsonData.find(item => item.category === "인기 시세");
        if (popularData) {
            popularData.data.forEach(item => {
                const listItem = document.createElement("li");
                listItem.textContent = `${item.no}. ${item.name}`;
                popularList.appendChild(listItem);
            });
        }
    } catch (error) {
        console.error("에러 발생:", error);
    }
}

// 렌더링 함수 실행
renderPrices();

// JSON 데이터를 fetch로 가져오기
async function fetchPriceData() {
    const response = await fetch('/js/data.json'); // JSON 파일 경로
    const jsonData = await response.json();
    return jsonData.filter(item => item.category === "핫소스"); // '핫소스' 카테고리만 필터링
}

// 평균, 최고, 최저 가격 계산
async function updatePriceInfo() {
    const hotSauceData = await fetchPriceData();

    // 가격 배열 생성 (숫자로 변환)
    const prices = hotSauceData.map(item => parseInt(item.price.replace(/,/g, ''))); // 쉼표 제거 후 숫자로 변환

    // 평균, 최고, 최저 가격 계산
    const avgPrice = Math.round(prices.reduce((acc, price) => acc + price, 0) / prices.length);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);

    // HTML 요소에 값 삽입
    document.getElementById('avgPrice').textContent = avgPrice.toLocaleString(); // 쉼표 추가
    document.getElementById('maxPrice').textContent = maxPrice.toLocaleString();
    document.getElementById('minPrice').textContent = minPrice.toLocaleString();
}

// 함수 실행
updatePriceInfo();

// JSON 데이터에서 상품 목록을 가져와 화면에 추가
async function loadProductList() {
    try {
        const response = await fetch('/js/data.json');
        const data = await response.json();

        // "핫소스" 카테고리만 필터링
        const hotSauceProducts = data.filter(product => product.category === "핫소스");

        const productList = document.getElementById("productList");

        // 상품 추가
        hotSauceProducts.forEach(product => {
            const li = document.createElement("li");

            // 상품 이미지
            const img = document.createElement("img");
            img.src = `/img/${product.img}`;
            img.alt = product.name;

            // 상품 정보
            const infoDiv = document.createElement("div");
            infoDiv.className = "product-info";

            const name = document.createElement("h3");
            name.textContent = product.name;

            const price = document.createElement("p");
            price.className = "product-price";
            price.textContent = `${product.price}원`;

            // 정보 추가
            infoDiv.appendChild(name);
            infoDiv.appendChild(price);

            // li 구성
            li.appendChild(img);
            li.appendChild(infoDiv);

            // 리스트에 추가
            productList.appendChild(li);
        });
    } catch (error) {
        console.error("상품 데이터를 불러오는 중 오류 발생:", error);
    }
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", loadProductList);

function addRecentSearch(query) {
    const recentSearchContainer = document.querySelector('.recent-search-wrapper');
    const recentItem = document.createElement('div');
    recentItem.className = 'recent-item';
    recentItem.textContent = query;

    // 클릭 시 해당 검색어를 삭제
    recentItem.addEventListener('click', function() {
        recentSearchContainer.removeChild(recentItem);
    });

    recentSearchContainer.appendChild(recentItem);
}

// 삭제 버튼 처리
document.querySelector('.recent-search-clear').addEventListener('click', function() {
    document.querySelector('.recent-search-wrapper').innerHTML = ''; // 최근 검색어 삭제
});