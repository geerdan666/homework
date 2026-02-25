import HeaderFixed from "./header.js";
import BurgerMenu from "./burger.js";

try {
  const headerFixed = new HeaderFixed({
    HEADER: "header",
    HEADER_FIXED: "header--fixed",
  });

  new BurgerMenu(
    {
      BURGER: "burger",
      BURGER_OPEN: "burger--open",
      HEADER_MENU: "header__nav",
      HEADER_MENU_OPEN: "header__nav--open",
      lABEL: {
        OPEN: "Открыть меню",
        CLOSE: "Закрыть меню",
      },
      PAGE_BODY: "html__body",
      PAGE_BODY_NO_SCROLL: "html__body--no-scroll",
      MENU_LINK: "nav__link",
      BREAKPOINT: 767,
    },
    headerFixed
  );
} catch (error) {
  console.error(error);
}
