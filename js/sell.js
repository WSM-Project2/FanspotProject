// 사진 미리보기 기능
document.getElementById('product-image').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const previewImage = document.getElementById('preview-image');

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        };

        reader.readAsDataURL(file);
    } else {
        previewImage.src = '';
        previewImage.style.display = 'none';
    }
});

// 상품 등록 버튼 클릭 이벤트
document.getElementById('submit-button').addEventListener('click', function () {
    const productImageInput = document.getElementById('product-image');
    const productNameInput = document.getElementById('product-name');
    const productDescriptionInput = document.getElementById('product-description');

    if (!productImageInput.value || !productNameInput.value.trim()) {
        alert('상품 사진과 이름을 모두 입력해주세요.');
        return;
    }

    const productData = {
        name: productNameInput.value.trim(),
        description: productDescriptionInput.value.trim(),
        image: document.getElementById('preview-image').src,
        price: '₩0' // 가격이 있으면 추가
    };

    // LocalStorage에 상품 데이터 저장
    saveProductToLocalStorage(productData);

    showNotification('🎉 상품이 성공적으로 등록되었습니다!');
    
    // 폼 초기화
    productImageInput.value = '';
    productNameInput.value = '';
    productDescriptionInput.value = '';
    document.getElementById('preview-image').src = '';
    document.getElementById('preview-image').style.display = 'none';
});

// 상품 데이터를 LocalStorage에 저장하는 함수
function saveProductToLocalStorage(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.unshift(product); // 최신 등록 상품이 위로 가게 추가
    localStorage.setItem('products', JSON.stringify(products));
}

// 알림 메시지 표시 함수
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
