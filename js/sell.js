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

// 등록 버튼 클릭 이벤트
document.getElementById('submit-button').addEventListener('click', function () {
    const productImageInput = document.getElementById('product-image');
    const productNameInput = document.getElementById('product-name');

    // 유효성 검사
    if (!productImageInput.value || !productNameInput.value.trim()) {
        alert('상품 사진과 이름을 모두 입력해주세요.');
        return;
    }

    // 알림 메시지 표시
    showNotification('상품이 등록되었습니다!');

    // 폼 초기화
    productImageInput.value = '';
    productNameInput.value = '';
    document.getElementById('product-description').value = '';
    const previewImage = document.getElementById('preview-image');
    previewImage.src = '';
    previewImage.style.display = 'none';
});

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
