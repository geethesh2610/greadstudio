window.addEventListener("DOMContentLoaded", () => {
    AOS.init();

    let navBtn = document.querySelector("#nav-btn");
    let floatingNav = document.querySelector("#floating-nav");
    let floatingNavAnchor = document.querySelectorAll("#floating-nav a");

    navBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleNav();
    });

    floatingNavAnchor.forEach((item) => {
        item.addEventListener("click", toggleNav);
    });

    // Add click event listener to the document
    document.addEventListener("click", handleOutsideClick);

    function toggleNav() {
        floatingNav.classList.toggle("translate-y-[2vw]");
        floatingNav.classList.toggle("opacity-0");
        floatingNav.classList.toggle("opacity-100");
        floatingNav.classList.toggle("translate-y-0");
    }

    function handleOutsideClick(event) {
        if (!floatingNav.contains(event.target) && event.target !== navBtn) {
            if (!floatingNav.classList.contains("translate-y-[2vw]") && !floatingNav.classList.contains("opacity-0")) {
                toggleNav();
            }
        }
    }
});
