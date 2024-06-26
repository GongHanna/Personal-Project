/* product swiper */
const mainSwiper = new Swiper(".main-swiper", {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 50,
  breakpoints: {
    340: {
      slidesPerView: 1,
      spaceBetween: 50
    },
    1000: {
      slidesPerView: 2,
      spaceBetween: 50
    },
    1400: {
      slidesPerView: 3,
      spaceBetween: 50
    }
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
/* product swiper */
const subSwiper = new Swiper(".sub-swiper", {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 50,
  breakpoints: {
    340: {
      slidesPerView: 1,
      spaceBetween: 50
    },
    1000: {
      slidesPerView: 2,
      spaceBetween: 50
    },
    1400: {
      slidesPerView: 3,
      spaceBetween: 50
    }
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/* gsap 스크롤 이벤트 */
const breakpoints = gsap.matchMedia();
breakpoints.add("(min-width: 1200px)", () => {
  gsap.to(".main .img-box", {
    xPercent: -50,
    width: "200%",
    scrollTrigger: {
      trigger: ".main .img-box",
      start: "center center",
      end: "bottom bottom",
      scrub: 1.5
    }
  });
});

breakpoints.add("(min-width: 700px)", () => {
  gsap.to(".technology .technology-list .technology-item:nth-child(odd)", {
    yPercent: 5,
    scrollTrigger: {
      trigger: ".technology .technology-list .technology-item:nth-child(odd)",
      start: "30% center",
      scrub: 0.5
    }
  });
  gsap.to(".technology .technology-list .technology-item:nth-child(even)", {
    yPercent: -5,
    scrollTrigger: {
      trigger: ".technology .technology-list .technology-item:nth-child(even)",
      start: "30% center",
      scrub: 0.5
    }
  });
});

/* 모바일에서 이미지 변환 */
// $(window).on('resize', function () {
//   if (600 >= $(window).width()) {
//     $(".technology .technology-list .technology-item img").attr({ src: "./images/m-technology01.png" })
//   }
// }).trigger('resize');
