document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector("#second-section");
    const textContainer = section.querySelector(".scroll-anim");
    const textElements = textContainer.querySelectorAll(".scroll-anim a");

    // Set initial positions, with the first element in view and others off-screen.
    gsap.set(textElements, { yPercent: 100, opacity: 0 });
    gsap.set(textElements[0], { yPercent: 0, opacity: 1 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "center center",
            end: "+=200%",
            pin: true,
            scrub: 1,
        },
    });

    textElements.forEach((el, index) => {
        if (index === 0) return; // Skip animation for the first element

        // Animate each subsequent element coming up and going out without stacking
        tl.to(el, { yPercent: 0, opacity: 1 }, index);
    });
});
