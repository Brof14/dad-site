const video = document.querySelector("#greeting-video");
const playButton = document.querySelector(".film__play");

if (video && playButton) {
  playButton.hidden = false;

  playButton.addEventListener("click", async () => {
    try {
      await video.play();
    } catch {
      video.focus();
    }
  });

  video.addEventListener("play", () => {
    playButton.hidden = true;
  });

  video.addEventListener("pause", () => {
    playButton.hidden = false;
  });

  video.addEventListener("ended", () => {
    playButton.hidden = false;
    playButton.setAttribute("aria-label", "Посмотреть поздравление ещё раз");
  });
}
