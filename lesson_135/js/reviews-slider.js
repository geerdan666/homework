export default function initReviewsSlider() {
  const slider = document.querySelector("[data-reviews-slider]");
  const track = slider?.querySelector(".reviews__track");
  const prevBtn = document.querySelector(".reviews__slider-button--prev");
  const nextBtn = document.querySelector(".reviews__slider-button--next");

  if (!slider || !track || !prevBtn || !nextBtn) return;

  const originalSlides = Array.from(track.children).map((node) =>
    node.cloneNode(true),
  );
  if (!originalSlides.length) return;

  let visible = 3;
  let index = 0;
  let step = 0;
  let slides = [];
  let isAnimating = false;
  let wheelDelta = 0;
  let wheelLock = false;
  let wheelUnlockTimer = null;

  const WHEEL_THRESHOLD = 40;
  const WHEEL_LOCK_MS = 320;

  const getVisibleCount = () => {
    if (window.innerWidth <= 576) return 1;
    if (window.innerWidth <= 996) return 2;
    return 3;
  };

  const getGap = () => {
    const styles = getComputedStyle(track);
    return parseFloat(styles.gap || styles.columnGap || "0") || 0;
  };

  const calcStep = () => {
    if (!slides.length) return;
    const width = slides[0].getBoundingClientRect().width;
    step = width + getGap();
  };

  const markSideSlides = () => {
    slides.forEach((slide) => slide.classList.remove("is-side"));

    const sideCount = window.innerWidth >= 1600 ? 2 : 1;

    for (let offset = 1; offset <= sideCount; offset += 1) {
      slides[index - offset]?.classList.add("is-side");
      slides[index + visible - 1 + offset]?.classList.add("is-side");
    }
  };

  const setPosition = (animate = true) => {
    track.style.transition = animate ? "transform 0.45s ease" : "none";
    track.style.transform = `translate3d(${-index * step}px, 0, 0)`;
    markSideSlides();
  };

  const rebuildTrack = () => {
    visible = getVisibleCount();

    track.innerHTML = "";

    const before = originalSlides.slice(-visible).map((s) => s.cloneNode(true));
    const center = originalSlides.map((s) => s.cloneNode(true));
    const after = originalSlides
      .slice(0, visible)
      .map((s) => s.cloneNode(true));

    before.forEach((slide) => track.append(slide));
    center.forEach((slide) => track.append(slide));
    after.forEach((slide) => track.append(slide));

    slides = Array.from(track.children);
    index = visible;

    requestAnimationFrame(() => {
      calcStep();
      setPosition(false);
    });
  };

  const move = (dir) => {
    if (isAnimating) return;
    isAnimating = true;
    index += dir;
    setPosition(true);
  };

  const onWheel = (event) => {
    const absX = Math.abs(event.deltaX);
    const absY = Math.abs(event.deltaY);
    const isHorizontal = absX > absY || event.shiftKey;

    if (!isHorizontal) return;
    event.preventDefault();

    if (wheelLock || isAnimating) return;

    wheelDelta += event.deltaX !== 0 ? event.deltaX : event.deltaY;

    if (Math.abs(wheelDelta) < WHEEL_THRESHOLD) return;

    move(wheelDelta > 0 ? 1 : -1);
    wheelDelta = 0;
    wheelLock = true;

    clearTimeout(wheelUnlockTimer);
    wheelUnlockTimer = setTimeout(() => {
      wheelLock = false;
    }, WHEEL_LOCK_MS);
  };

  prevBtn.addEventListener("click", () => move(-1));
  nextBtn.addEventListener("click", () => move(1));
  slider.addEventListener("wheel", onWheel, { passive: false });


  track.addEventListener("transitionend", (event) => {
    if (event.target !== track) return;

    const firstReal = visible;
    const lastReal = visible + originalSlides.length - 1;

    if (index < firstReal) {
      index += originalSlides.length;
      setPosition(false);
    } else if (index > lastReal) {
      index -= originalSlides.length;
      setPosition(false);
    }

    isAnimating = false;
  });

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      rebuildTrack();
    }, 150);
  });

  rebuildTrack();
}
