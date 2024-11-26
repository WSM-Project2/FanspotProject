document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");
    const chatMessages = document.getElementById("chatMessages");

    // 간단한 AI 응답 예제
    const aiResponses = [
        "안녕하세요!",
        "애누리 안됩니다.",
        "좋은 하루 되세요!",
        "직거래 원합니다.",
        "장난 치시는거죠?",
    ];

    // 메시지 추가 함수
    const addMessage = (message, sender) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("chat-message", sender);
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);

        // 메시지 스크롤을 맨 아래로
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // 사용자 메시지 처리
    const handleMessage = () => {
        const message = userInput.value.trim();
        if (message === "") return;

        // 사용자 메시지 추가
        addMessage(message, "user");
        userInput.value = "";

        // AI 응답 추가
        setTimeout(() => {
            const randomResponse =
                aiResponses[Math.floor(Math.random() * aiResponses.length)];
            addMessage(randomResponse, "ai");
        }, 500); // 응답 딜레이
    };

    // 버튼 클릭 이벤트
    sendButton.addEventListener("click", handleMessage);

    // Enter 키 입력 이벤트
    userInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handleMessage();
        }
    });
});