function toggleMenu() {
    // const navToggleDiv = document.getElementsByClassName("nav-toggle")[0];
    const navToggleDiv = document.getElementById("nav-toggle");
    const navListUl = document.getElementsByClassName("nav-list")[0];
    const toggleI = navToggleDiv.getElementsByTagName("i")[0];

    navToggleDiv.onclick = (event) => {     //이벤트 함수 만들기 --> onclick은 클릭을 했을 때 실행
        navListUl.classList.toggle("show-menu");

        toggleI.classList.toggle("bi-list");
        toggleI.classList.toggle("bi-x-lg");
        // toggleI.classList.remove("bi-list");
        // toggleI.classList.add("di-x-lg");
        // toggleI.classList.remove("di-x-lg");
        // toggleI.classList.add("di-x-lg");
    }
}
toggleMenu();   //함수 호출