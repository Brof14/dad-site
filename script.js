const video = document.querySelector("#greeting-video");
const playButton = document.querySelector(".film__play");
const status = document.querySelector(".film__status");
const orientationHint = document.querySelector(".film__orientation");
const media = document.querySelector(".hero__media");
const portraitPhone = window.matchMedia("(max-width: 760px) and (orientation: portrait)");

if (video && playButton && status && orientationHint && media) {
  video.controls = false;
  playButton.hidden = false;

  const updateOrientationHint = () => {
    orientationHint.hidden = video.paused || video.ended || !portraitPhone.matches;
  };

  playButton.addEventListener("click", async () => {
    status.hidden = true;
    status.textContent = "";
    playButton.disabled = true;
    video.controls = true;
    try {
      if (video.ended) video.currentTime = 0;
      await video.play();
    } catch {
      status.textContent = "Не удалось запустить видео. Попробуйте использовать элементы управления плеером.";
      status.hidden = false;
    } finally {
      playButton.disabled = false;
    }
  });

  video.addEventListener("play", () => {
    media.classList.add("has-started");
    playButton.hidden = true;
    status.hidden = true;
    status.textContent = "";
    updateOrientationHint();
  });

  video.addEventListener("pause", () => {
    playButton.hidden = false;
    if (!video.ended) playButton.setAttribute("aria-label", "Продолжить поздравление");
    updateOrientationHint();
  });

  video.addEventListener("ended", () => {
    media.classList.remove("has-started");
    playButton.hidden = false;
    playButton.setAttribute("aria-label", "Посмотреть поздравление ещё раз");
    updateOrientationHint();
  });

  portraitPhone.addEventListener("change", updateOrientationHint);

  video.addEventListener("error", () => {
    status.textContent = "Видео не загрузилось. Проверьте подключение и попробуйте ещё раз.";
    status.hidden = false;
    playButton.hidden = false;
  });
}
