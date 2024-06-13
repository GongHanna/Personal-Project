/* main-page animation */
$(window).on("load", () => {
  $(".main-contents .main-contents-left .line").addClass("line-ani");
  $(".main-contents .main-contents-left .line-svg, .main-contents .main-contents-left .object-svg").addClass("svg-ani");
  $(".main-contents .main-contents-left").addClass("mov-box");
  $(".main-contents .main-contents-right").addClass("mov-text");
  $(".main-contents .main-contents-right .svg-box").addClass("right-svg-ani");
});

/* company-introduction 슬라이드 */
function myPlugin({ swiper, extendParams, on }) {
  extendParams({
    debugger: false, // 디버거 옵션
  });

  on('slideChange', () => {
    // 모든 슬라이드에서 'next-style' 클래스 제거
    swiper.slides.forEach(slide => {
      slide.classList.remove('next-style');
    });

    // 현재 활성화된 슬라이드 가져오기
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (activeSlide) {
      // 활성화된 슬라이드에 'next-style' 클래스 추가
      activeSlide.classList.add('next-style');

      // 활성화된 슬라이드만 숫자 카운팅 애니메이션 적용
      $(activeSlide).find('.num-count').each(function () {
        const $this = $(this);
        const endNumber = parseInt($this.data("end"), 10);
        animateNumber($this, 0, endNumber);
      });
    }
  });
}

const mainSwiper = new Swiper(".main-swiper", {
  modules: [myPlugin],
  speed: 600,
  loop: true,
  parallax: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  slidesPerView: "auto",
  slidesPerGroup: 1,
  spaceBetween: 50,
  centeredSlides: true,
  on: {
    init: function () {
      updateSlideWidths(this);
    },
    resize: function () {
      updateSlideWidths(this);
    },
    update: function () {
      updateSlideWidths(this);
    },
  },
  debugger: true,
});

function updateSlideWidths(swiper) {
  swiper.slides.forEach((slide) => {
    slide.style.width = '497px';
  });
}

// 숫자를 애니메이션으로 업데이트하는 함수
function animateNumber($element, start, end) {
  $({ Counter: start }).animate(
    { Counter: end },
    {
      duration: 800,
      easing: "swing",
      step: function (now) {
        $element.text(Math.floor(now));
      },
      complete: function () {
        $element.text(end);
      },
    }
  );
}

/* 스크롤 이벤트 숫자 카운트 애니메이션 */
$(window).on("scroll", function () {
  const mainHt = $(".main-contents").offset().top * 0.9;

  if ($(window).scrollTop() > mainHt) {
    $(".num-count").each(function () {
      const $this = $(this);
      if (!$this.data("animated")) {
        const endNumber = parseInt($this.data("end"), 10);
        animateNumber($this, 0, endNumber);
        $this.data("animated", true);
      }
    });
  } else {
    // 스크롤이 다시 위로 올라갈 경우 애니메이션 초기화
    $(".company-introduction .intro-list .num-count").each(function () {
      $(this).data("animated", false);
    });
  }
});

/* auto-slide */
const $slideBtn = $(".auto-slide .pagination .pagination-btn");
let currentIdx = 0;
let mainAutoSlide;

// 자동 슬라이드
const showSlide = (index) => {
  // 슬라이드를 숨기고 이미지를 초기 위치로 이동
  $(".auto-slide .slide-box").hide();
  $(".auto-slide .slide-box .slide-img").css({
    top: "70%",
    opacity: 0,
  });

  // 선택한 슬라이드 표시 및 이미지 애니메이션
  $(".auto-slide .slide-box").eq(index).fadeIn("slow", function () {
    $(this).find(".slide-img").animate(
      { top: "50%", opacity: 1 },
      400
    );

    // SVG 애니메이션 트리거
    const svgWrapper = $(this).closest(".auto-slide").find(".svg-wrapper");
    svgWrapper.find(".arrow").addClass("svg-animation1");
    svgWrapper.find(".heart-arrow").addClass("svg-animation2");
    svgWrapper.find(".point-circle").addClass("svg-animation3");

    // 애니메이션이 끝난 후 클래스를 제거하여 반복 가능하게 설정
    setTimeout(() => {
      svgWrapper.find(".arrow").removeClass("svg-animation1");
      svgWrapper.find(".heart-arrow").removeClass("svg-animation2");
      svgWrapper.find(".point-circle").removeClass("svg-animation3");
    }, 2000);
  });

  // 버튼 활성화 상태 변경
  $slideBtn.removeClass("click-btn").eq(index).addClass("click-btn");
};

// 클릭 이벤트
$slideBtn.on("click", (e) => {
  const idx = $(e.target).index();
  currentIdx = idx;

  showSlide(currentIdx);

  // 클릭 시 자동 슬라이드 일시 정지 및 재시작
  clearInterval(mainAutoSlide);
  mainAutoSlide = setInterval(autoSlide, 2500);
});

// 자동 슬라이드
const autoSlide = () => {
  currentIdx = (currentIdx + 1) % $(".auto-slide .slide-box").length;
  showSlide(currentIdx);
};

// 초기 슬라이드 설정
showSlide(currentIdx);
mainAutoSlide = setInterval(autoSlide, 2500);

/* 이미지 슬라이드 */
const imgSwiper = new Swiper(".img-swiper", {
  speed: 600,
  loop: true,
  parallax: true,
  navigation: {
    nextEl: ".new-video-swiper-button-next",
    prevEl: ".new-video-swiper-button-prev",
  },
  slidesPerView: "auto",
  slidesPerGroup: 1,
  spaceBetween: 0,
  on: {
    init: function () {
      setImgSlideWidths();
      updateBackgroundAndSvgColors(this.realIndex);
    },
    slideChange: function () {
      updateBackgroundAndSvgColors(this.realIndex);
    },
  },
});

function setImgSlideWidths() {
  $(".img-swiper .slide-wrapper .swiper-slide").css("width", "100vw");
}

// 기존 네비게이션 버튼 숨기기
$(".swiper-button-next").hide();
$(".swiper-button-prev").hide();

// 버튼 클릭 이벤트
$(".new-swiper-button-prev").on('click', function () {
  imgSwiper.slidePrev();
  animateSvgs();
});

$(".new-swiper-button-next").on('click', function () {
  imgSwiper.slideNext();
  animateSvgs();
});

function updateBackgroundAndSvgColors(realIndex) {
  let bgColor, svgColor;

  if (realIndex === 0) {
    bgColor = "var(--primary-color)";
    svgColor = "";
  } else if (realIndex === 1) {
    bgColor = "var(--cont4-bgColor2)";
    svgColor = "var(--primary-color)";
  } else if (realIndex === 2) {
    bgColor = "var(--cont4-bgColor3)";
    svgColor = "";
  }

  // 슬라이드 배경색 변경
  $(".img-swiper .slide-wrapper .swiper-slide").css("background-color", bgColor);

  // 두 번째 슬라이드 svg 색상 변경
  if (svgColor) {
    $(".free-experience-slide .img-svg-wrapper .color-change").css("fill", svgColor);
  } else {
    $(".free-experience-slide .img-svg-wrapper .color-change").css("fill", "");
  }
}

function animateSvgs() {
  const svgs = $(".free-experience-slide .img-svg-wrapper svg");
  svgs.stop(true, true);
  svgs.hide();
  svgs.eq(0).fadeIn(300, function () {
    svgs.eq(1).fadeIn(500, function () {
      svgs.eq(2).fadeIn(700);
    });
  });
}

/* review 스크롤 이벤트 */
$(window).scroll(function () {
  function updateActiveCard() {
    var scrollPosition = $(window).scrollTop();
    var $cards = $('.review .card-list');

    $cards.each(function () {
      var $card = $(this);
      var cardTopPosition = $card.offset().top;
      var cardHeightHalf = $card.outerHeight() / 2;

      if (cardTopPosition - cardHeightHalf <= scrollPosition) {
        $cards.removeClass("blur");
        $card.addClass("blur");
      }
    });

    // 특정 카드에 대한 스타일 변경
    if ($cards.eq(1).offset().top - $cards.eq(1).outerHeight() / 2 <= scrollPosition) {
      $(".item1-3 path, .item1-4 path").css({ fill: "#FE696B" });
      $(".item1-5 path").css({ fill: "#5BC3F0" });
    } else {
      $(".item1-3 path, .item1-4 path").css({ fill: "" });
      $(".item1-5 path").css({ fill: "" });
    }

    if ($cards.eq(3).offset().top - $cards.eq(3).outerHeight() / 2 <= scrollPosition) {
      $(".item1-7 path").css({ fill: "#00A791" });
    } else {
      $(".item1-7 path").css({ fill: "" });
    }
  }

  updateActiveCard();
});

/* 비디오 슬라이드 */
$(function () {
  let current = 0;
  const $videoSlide = $(".video-slide .video-slide-wrapper");
  const $prevBtn = $(".video-slide .video-btn .video-prev-btn");
  const $nextBtn = $(".video-slide .video-btn .video-next-btn");
  const totalSlides = $(".video-slide .video-box").length;

  // 슬라이드 이동
  const moveSlide = (index) => {
    $videoSlide.css({ marginLeft: -100 * index + "%" });

    // 다음 버튼
    if (index === totalSlides - 1) {
      $nextBtn.addClass("btn-style");
    } else {
      $nextBtn.removeClass("btn-style");
    }

    // 이전 버튼
    if (index === 0) {
      $prevBtn.addClass("btn-style");
    } else {
      $prevBtn.removeClass("btn-style");
    }
  };

  // SVG 애니메이션 함수
  const animateSvgs = () => {
    const $svgs = $(".video-slide .video-slide-wrapper .slider-points svg");
    $svgs.stop(true, true).hide();

    $svgs.each(function (index) {
      $(this).delay(300 * index).fadeIn(300);
    });
  };

  // 다음버튼 클릭 이벤트
  $nextBtn.on("click", () => {
    // 현재 인덱스가 마지막 슬라이드가 아닐 때만 슬라이드 이동
    if (current < totalSlides - 1) {
      current++;
      moveSlide(current);
      animateSvgs();
    }
  });

  // 이전버튼 클릭 이벤트
  $prevBtn.on("click", () => {
    // 현재 인덱스가 첫 번째 슬라이드가 아닐 때만 슬라이드 이동
    if (current > 0) {
      current--;
      moveSlide(current);
      animateSvgs();
    }
  });
});

/* Ajax */
// 이미지 슬라이드
$.ajax({
  url: "./assets/DB/free-experience-data-list.json",
  dataType: "json",
  success: (data) => {
    if (data) {
      $.each(data, (idx, elem) => {
        const experienceData = `
            <h2 class="title">${elem.title}</h2>
            <p class="des">${elem.desc}</p>
            <div class="img-wrapper">
              <img src=${elem.imgUrl} alt=${elem.title}>
            </div>
            <a href="# " class="application-btn">${elem.btn}</a>
          `;
        $(".experience").eq(idx).append(experienceData);
      });
    }
  },
  error: (xhr, status, error) => {
    console.log("AJAX 요청 실패:", xhr, status, error);
  },
});
// 후기
$.ajax({
  url: "./assets/DB/review-data-list.json",
  dataType: "json",
  success: (data) => {
    if (data) {
      $.each(data, (idx, elem) => {
        const reviewData = `
          <p class="parents">
            <img src=${elem.imgUrl} alt="emoji-icon">
            ${elem.parents}
          </p>
          <p class="review-desc">${elem.reviewDesc}</p>
          <p class="location">${elem.location}</p>
          <p class="name">${elem.name}<span>${elem.spanName}</span></p>
          `;
        $(".card-list").eq(idx).append(reviewData);
      });
    }
  },
  error: (xhr, status, error) => {
    console.log("AJAX 요청 실패:", xhr, status, error);
  },
});
