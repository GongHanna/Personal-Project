/* a 요소가 가지고 있는 기본 이벤트 제거 */
$('a[href="#"]').on("click", (e) => {
  e.preventDefault();
});

/* 모바일 버튼 클릭 시 메뉴 보이기 */
$(".header .mobile-btn").on("click", () => {
  $(".header .mobile-btn").toggleClass("toggle");
  $(".header .global-menu").slideToggle();
});

/* 메뉴 클릭 시 페이지 이동 */
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