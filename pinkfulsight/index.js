/* a 요소가 가지고 있는 기본 이벤트 제거 */
$('a[href="#"]').on("click", (e) => {
  e.preventDefault();
});

/* 로고 클릭 시 페이지 맨 위로 이동 */
$(".header .logo a").on("click", (e) => {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* 모바일 버튼 클릭 시 메뉴 보이기 */
$(".header .mobile-btn").on("click", () => {
  $(".header .mobile-btn").toggleClass("toggle");
  $(".header .global-menu").slideToggle();
});

/* footer 마우스 허버 이벤트 */
$('.footer .footer-menu li a').hover(
  function () {
    $('.footer .footer-menu li a').not(this).parent().addClass('is-not-hovered');
  },
  function () {
    $('.footer .footer-menu li').removeClass('is-not-hovered');
  }
);

/* 해당 컨텐츠로 부드러운 이동 */
$(".header .global-menu li a").each(function (idx, elem) {
  $(elem).on("click", (e) => {
    e.preventDefault();

    const targetId = $(elem).attr('href');
    const contentsHt = $(targetId).offset().top;
    scrollTo({
      top: contentsHt,
      behavior: "smooth",
    });
  });
});
$(".footer .footer-menu li a").each(function (idx, elem) {
  $(elem).on("click", (e) => {
    e.preventDefault();

    const targetId = $(elem).attr('href');
    const contentsHt = $(targetId).offset().top;
    scrollTo({
      top: contentsHt,
      behavior: "smooth",
    });
  });
});

/* 자동 슬라이드 */
$('.favorite-wrapper').each(function() {
  let idx = 0;
  const $images = $(this).find('.left-box img');
  const slideItems = $images.length;
  const $paginationItems = $(this).find('.pagination li');

  // 자동 슬라이드 함수
  function autoSlide() {
    $images.eq(idx).removeClass('event');

    idx++;
    if (idx >= slideItems) {
      idx = 0;
    }

    $images.eq(idx).addClass('event');

    updatePagination();
  }

  function updatePagination() {
    $paginationItems.removeClass('active'); 
    $paginationItems.eq(idx).addClass('active'); 
  }

  // 페이지네이션 버튼 클릭 처리
  $paginationItems.each(function(index) {
    $(this).on('click', function() {
      if (idx !== index) {
        $images.filter('.event').removeClass('event');

        idx = index;

        $images.eq(idx).addClass('event');

        updatePagination();
      }
    });
  });

  setInterval(autoSlide, 2000);
});

/* .rolled-over 이벤트 */
gsap.utils.toArray('.rolled-over').forEach((txt) => {
  gsap.timeline({
    scrollTrigger: {
      trigger: txt,
      start: '50% 100%',
      end: '100% 100%',
      scrub: 1
    }
  }).fromTo(
    txt,
    {
      y: 100,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      ease: 'none',
      duration: 5
    }
  );
});

/* blog swiper */
const mainswiper = new Swiper('.main-swiper', {
  slidesPerView: "auto",
  slidesPerGroup: 1,
  spaceBetween: 1272,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    init: function () {
      updateSlideWidth();
    },
    resize: function () {
      updateSlideWidth();
    }
  }
});

function updateSlideWidth() {
  const slides = document.querySelectorAll('.swiper-slide');
  slides.forEach(slide => {
    if (window.innerWidth <= 600) {
      slide.style.width = '90vw';
    } else {
      slide.style.width = '66.25vw';
    }
  });
}
updateSlideWidth();
window.addEventListener('resize', updateSlideWidth);

