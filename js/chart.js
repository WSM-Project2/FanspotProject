// JSON 데이터 가져오기
async function fetchData() {
    const response = await fetch('/js/data.json'); // JSON 파일 경로
    const jsonData = await response.json();
    return jsonData.filter(item => item.category === "핫소스"); // '핫소스' 상품만 필터링
}

// 차트 생성
async function createChart() {
    const hotSauceData = await fetchData();

    // 상품 이름과 가격 추출
    const labels = hotSauceData.map(item => item.name);
    const prices = hotSauceData.map(item => parseInt(item.price.replace(/,/g, ''))); // 쉼표 제거 후 숫자로 변환

    // 차트 설정
    const ctx = document.getElementById('priceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '가격 (원)',
                data: prices,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString(); // 숫자 쉼표로 구분
                        }
                    }
                }
            }
        }
    });
}

createChart();