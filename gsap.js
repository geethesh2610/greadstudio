document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Lenis smooth scrolling setup
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
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    requestAnimationFrame(function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            lenis.scrollTo(anchor.getAttribute("href"));
        });
    });

    // Second section animation
    const secondSection = document.querySelector("#second-section");
    const textContainer = secondSection?.querySelector(".scroll-anim");
    const textElements = textContainer.querySelectorAll(".scroll-anim a");

    gsap.set(textElements, { yPercent: 100, opacity: 0 });
    gsap.set(textElements[0], { yPercent: 0, opacity: 1 });

    const secondSectionTl = gsap.timeline({
        scrollTrigger: {
            trigger: secondSection,
            start: "center center",
            end: "+=200%",
            pin: true,
            scrub: 1,
        },
    });

    textElements.forEach((el, index) => {
        if (index !== 0) {
            secondSectionTl.to(el, { yPercent: 0, opacity: 1 }, index);
        }
    });

    // Circle animation
    const xOffset = 10;
    const yOffset = 10;

    gsap.timeline({
        scrollTrigger: {
            trigger: "#second-section",
            start: "top top",
            end: "bottom 40%",
            scrub: 2,
        },
    }).to("#second-section .circle", {
        duration: 1,
        x: () => {
            const secondSection = document.querySelector("#second-section");
            const aboutSection = document.querySelector("#about-section");
            const startCircle = document.querySelector("#second-section .circle");
            const endCircle = document.querySelector("#about-section .heading .bg-\\[\\#b6d561\\]");

            return endCircle.getBoundingClientRect().left - secondSection.getBoundingClientRect().left - startCircle.offsetLeft + xOffset;
        },
        y: () => {
            const secondSection = document.querySelector("#second-section");
            const aboutSection = document.querySelector("#about-section");
            const startCircle = document.querySelector("#second-section .circle");
            const endCircle = document.querySelector("#about-section .heading .bg-\\[\\#b6d561\\]");

            return aboutSection.getBoundingClientRect().top - secondSection.getBoundingClientRect().top + endCircle.offsetTop - startCircle.offsetTop + yOffset;
        },
        scale: () => {
            const startCircle = document.querySelector("#second-section .circle");
            const endCircle = document.querySelector("#about-section .heading .bg-\\[\\#b6d561\\]");
            return endCircle.offsetWidth / startCircle.offsetWidth;
        },
        ease: "power2.inOut",
    });

    // About section animation
    const aboutSection = document.getElementById("about-section");
    const aboutHeading = aboutSection.querySelector(".heading");
    const info = document.getElementById("info");

    if (aboutSection && aboutHeading && info) {
        gsap.set([aboutHeading.children[1], info], { opacity: 0 });

        const aboutTl = gsap.timeline({
            scrollTrigger: {
                trigger: aboutSection,
                start: "top 60%",
                end: "center center",
                scrub: true,
                toggleActions: "play none none reverse",
            },
        });

        aboutTl
            .to(aboutHeading.children[1], {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
            })
            .to(
                info,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                },
                "-=0.1"
            );

        const words = info.innerHTML.split(" ");
        info.innerHTML = words.map((word) => `<span style="opacity: 0">${word} </span>`).join("");

        gsap.to(info.children, {
            opacity: 1,
            duration: 0.05,
            stagger: 0.03,
            ease: "none",
            scrollTrigger: {
                trigger: info,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse",
            },
        });
    }
});
