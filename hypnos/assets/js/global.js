/* a 요소의 기본 성격 제거 */
$('a[href="#"]').on('click', (e) => {
  e.preventDefault();
});

/* 로고 클릭 시 페이지 맨 위로 이동 */
$(".header .logo").on("click", () => {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* product Ajax */
$.ajax({
  url: "https://gonghanna.github.io/Personal-Project/hypnos/assets/DB/products-data-list.json",
  dataType: "json",
  success: (data) => {
    if (data) {
      $.each(data, (idx, elem) => {
        const productList = `
          <img src=${elem.imgUrl} alt=${elem.name} class="item-img">
          <p class="item-type">${elem.type}</p>
          <h3 class="item-name">${elem.name}</h3>
          <p class="item-price">${elem.price}</p>
          `;
        $('.products .slide-wrapper .slide-list .slide-item').eq(idx).append(productList);
      });
    }
  },
  error: (xhr, status, error) => {
    console.log('AJAX 요청 실패:', xhr, status, error);
  }
});

/* technology Ajax */
$.ajax({
  url: "https://gonghanna.github.io/Personal-Project/hypnos/assets/DB/technology-data-list.json",
  dataType: "json",
  success: (data) => {
    if (data) {
      $.each(data, (idx, elem) => {
        const technologyList = `
          <img src=${elem.imgUrl} alt=${}>
          <h3 class="item-name">${elem.name}
            <span class="spacing">${elem.spacing}</span>
          </h3> 
          `;
        $('.technology .technology-list .technology-item').eq(idx).append(technologyList);
      });
    }
  },
  error: (xhr, status, error) => {
    console.log('AJAX 요청 실패:', xhr, status, error);
  }
});