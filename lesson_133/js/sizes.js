export const sizes = () => {
  const sizesList = document.querySelector('[data-sizes="list"]');
  const sizesButtons = document.querySelectorAll('[data-sizes="button"]');

  const handleSizeClick = (event) => {
    const target = event.target;

    if (!target?.classList.contains("available__button")) return;

    sizesButtons.forEach((button) =>
      button.classList.remove("available__button--active")
    );
    target.classList.add("available__button--active");
  };

  sizesList.addEventListener("click", handleSizeClick);
};
