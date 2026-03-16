import BurgerMenu from "./burger.js";
import initDiscountClose from "./discount.js";
import initReviewsSlider from "./reviews-slider.js";

try {

  new BurgerMenu(
    {
      BURGER: "burger",
      BURGER_OPEN: "burger--open",
      HEADER_MENU: "header__list",
      HEADER_MENU_OPEN: "header__list--open",
      lABEL: {
        OPEN: "Открыть меню",
        CLOSE: "Закрыть меню",
      },
      PAGE_BODY: "body",
      PAGE_BODY_NO_SCROLL: "body--no-scroll",
      MENU_LINK: "header__link",
      BREAKPOINT: 1040,
      MAIN: "main",
    },
  );

  initReviewsSlider();
  initDiscountClose();
} catch (error) {
  console.error(error);
}
