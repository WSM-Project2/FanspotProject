const wishlistItems = document.getElementById('wishlist-items');

async function loadWishlist() {
  try {
    // JSON 파일 불러오기
    const response = await fetch('wishlist.json');
    const data = await response.json();

    // linked가 true인 상품만 필터링
    const filteredItems = data.filter(item => item.linked === true);

    // 필터링된 상품 렌더링
    renderWishlist(filteredItems);
  } catch (error) {
    console.error("Error loading wishlist data:", error);
  }
}

function renderWishlist(items) {
  wishlistItems.innerHTML = ''; // 기존 콘텐츠 초기화
  items.forEach(item => {
    // 각각의 찜한 상품 HTML 요소 생성
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('wishlist-item');
    itemDiv.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h4>${item.name}</h4>
      <p>${item.price}</p>
      <p>${item.info}</p>
    `;
    wishlistItems.appendChild(itemDiv);
  });
}

// 찜한 상품 로드
loadWishlist();
