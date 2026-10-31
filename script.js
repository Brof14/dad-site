const video = document.querySelector("#greeting-video");
const playButton = document.querySelector(".film__play");
const status = document.querySelector(".film__status");

if (video && playButton && status) {
  playButton.hidden = false;

  playButton.addEventListener("click", async () => {
    status.hidden = true;
    status.textContent = "";
    playButton.disabled = true;
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
    playButton.hidden = true;
    status.hidden = true;
    status.textContent = "";
  });

  video.addEventListener("pause", () => {
    playButton.hidden = false;
    if (!video.ended) playButton.setAttribute("aria-label", "Продолжить поздравление");
  });

  video.addEventListener("ended", () => {
    playButton.hidden = false;
    playButton.setAttribute("aria-label", "Посмотреть поздравление ещё раз");
  });

  video.addEventListener("error", () => {
    status.textContent = "Видео не загрузилось. Проверьте подключение и попробуйте ещё раз.";
    status.hidden = false;
    playButton.hidden = false;
  });
}
