document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.005 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const section = document.querySelector("#second-section");
    const textContainer = section.querySelector(".scroll-anim");
    const textElements = textContainer.querySelectorAll(".scroll-anim a");
    const heading = document.querySelector("#about-section .heading");

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
        if (index === 0) return;

        tl.to(el, { yPercent: 0, opacity: 1 }, index);
    });

    // const xOffset = 10;
    // const yOffset = 10;

    // gsap.timeline({
    //     scrollTrigger: {
    //         trigger: "#second-section",
    //         start: "top top",
    //         end: "bottom 40%",
    //         scrub: 1,
    //         markers:true
    //     },
    // }).to("#second-section .circle", {
    //     duration: 1,
    //     x: () => {
    //         const secondSection = document.querySelector("#second-section");
    //         const aboutSection = document.querySelector("#about-section");
    //         const startCircle = document.querySelector("#second-section .circle");
    //         const endCircle = document.querySelector("#about-section .heading .bg-\\[\\#b6d561\\]");

    //         return endCircle.getBoundingClientRect().left - secondSection.getBoundingClientRect().left - startCircle.offsetLeft + xOffset;
    //     },
    //     y: () => {
    //         const secondSection = document.querySelector("#second-section");
    //         const aboutSection = document.querySelector("#about-section");
    //         const startCircle = document.querySelector("#second-section .circle");
    //         const endCircle = document.querySelector("#about-section .heading .bg-\\[\\#b6d561\\]");

    //         return aboutSection.getBoundingClientRect().top - secondSection.getBoundingClientRect().top + endCircle.offsetTop - startCircle.offsetTop + yOffset;
    //     },
    //     scale: () => {
    //         const startCircle = document.querySelector("#second-section .circle");
    //         const endCircle = document.querySelector("#about-section .heading .bg-\\[\\#b6d561\\]");
    //         return endCircle.offsetWidth / startCircle.offsetWidth;
    //     },
    //     ease: "power2.inOut",
    // });
});
