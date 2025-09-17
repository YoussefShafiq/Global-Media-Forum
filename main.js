import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.mjs";

// Define functions globally
function openNavbarModal() {
    console.log('navbar modal opened');
    const navbarModal = document.getElementById('navbar-modal');
    const closeNavbarModalBtn = document.getElementById('close-navbar-modal-btn');
    navbarModal.classList.remove('top-[-100vh]');
    navbarModal.classList.add('top-0');
    closeNavbarModalBtn.classList.remove('hidden');
}

function closeNavbarModal() {
    console.log('navbar modal closed');
    const navbarModal = document.getElementById('navbar-modal');
    const closeNavbarModalBtn = document.getElementById('close-navbar-modal-btn');
    navbarModal.classList.remove('top-0');
    navbarModal.classList.add('top-[-100vh]');
    closeNavbarModalBtn.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function () {

    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 5 }
        }
    });

    const accordionButtons = document.querySelectorAll('.accordion-btn');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.fa-chevron-down');

            // Toggle the active class on the icon
            icon.classList.toggle('rotate-180');

            // Close all other accordion items
            accordionButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    const otherContent = otherButton.nextElementSibling;
                    const otherIcon = otherButton.querySelector('.fa-chevron-down');

                    otherContent.style.maxHeight = null;
                    otherIcon.classList.remove('rotate-180');
                }
            });

            // Toggle the current accordion item
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Open the first accordion by default
    if (accordionButtons.length > 0) {
        accordionButtons[0].click();
    }

    console.log('DOM fully loaded');
    // Get the web projects element and right section image container
    const webProjects = document.getElementById('web-projects');
    const rightSection = document.getElementById('web-projects-image');
    const aboutAgency = document.getElementById('about-agency');

    if (!webProjects) console.error('web-projects element not found!');
    if (!rightSection) console.error('web-projects-image element not found!');
    if (!aboutAgency) console.error('about-agency element not found!');

    let currentTranslateClass = '';

    function updateTranslateY() {
        if (!webProjects || !rightSection) return;

        // Remove previous translate class if it exists
        if (currentTranslateClass) {
            rightSection.classList.remove(currentTranslateClass);
        }

        // Calculate the height and create the new translate class
        const webProjectsHeight = webProjects.offsetHeight;
        currentTranslateClass = `-translate-y-[${webProjectsHeight}px]`;

        if (window.innerWidth >= 1024) {
            // Apply the new translate class
            rightSection.classList.add('transition-transform', 'duration-300');
            rightSection.classList.add(currentTranslateClass);
            aboutAgency.classList.add('transition-transform', 'duration-300');
            aboutAgency.classList.add(currentTranslateClass);
        }
    }

    // Initial update
    updateTranslateY();

    // Update on window resize with debounce
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateTranslateY, 250);
    });

    // navbar modal - add event listeners
    const navbarModalBtn = document.getElementById('navbar-modal-btn');
    const closeNavbarModalBtn = document.getElementById('close-navbar-modal-btn');

    if (navbarModalBtn) {
        navbarModalBtn.addEventListener('click', openNavbarModal);
    }

    if (closeNavbarModalBtn) {
        closeNavbarModalBtn.addEventListener('click', closeNavbarModal);
    }

    // carousel rendering
    function carouselCardTemplate(title, imageUrl) {
        return `
                <div class="swiper-slide">
                    <div class="bg-white overflow-hidden h-full">
                        <div class="overflow-hidden aspect-square">
                            <img src="${imageUrl}"
                                class="w-full h-full object-cover" alt="${title} Image">
                        </div>
                        <div class="p-6 flex flex-col justify-between flex-1">
                            <h3 class="text-xl font-bold mb-2">${title}</h3>
                        </div>
                    </div>
                </div>
        `;
    }
    const cards = [
        {
            title: "Web Development",
            image: "./src/assets/3e2820ad-46f8-4e26-b456-83c9cf339fde.png"
        },
        {
            title: "App Development",
            image: "./src/assets/3e2820ad-46f8-4e26-b456-83c9cf339fde.png"
        },
        {
            title: "UI/UX Design",
            image: "./src/assets/3e2820ad-46f8-4e26-b456-83c9cf339fde.png"
        },
        {
            title: "Digital Marketing",
            image: "./src/assets/3e2820ad-46f8-4e26-b456-83c9cf339fde.png"
        },
        {
            title: "Data Analytics",
            image: "./src/assets/3e2820ad-46f8-4e26-b456-83c9cf339fde.png"
        },
        {
            title: "Cloud Solutions",
            image: "./src/assets/3e2820ad-46f8-4e26-b456-83c9cf339fde.png"
        }
    ];
    const carouselWrapper = document.getElementById('carousel-wrapper');
    if (carouselWrapper) {
        cards.forEach(card => {
            carouselWrapper.innerHTML += carouselCardTemplate(card.title, card.image);
        });
    }
}); 