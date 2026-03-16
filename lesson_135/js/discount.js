export default function initDiscountClose() {
  const discount = document.querySelector(".discount");
  const closeButton = document.querySelector(".discount__close");

  if (!discount || !closeButton) return;

  closeButton.addEventListener("click", () => {
  discount.classList.add("discount--closing");

  discount.addEventListener(
    "transitionend",
    (event) => {
      if (event.target !== discount) return;
      discount.classList.add("discount--hidden");
    },
    { once: true }
  );
});
}