(() => {
  const KEY = "comicBundleCountdownEnd";
  const FIFTEEN_MINUTES = 15 * 60 * 1000;

  function getEndTime() {
    const saved = Number(sessionStorage.getItem(KEY));
    const now = Date.now();
    if (saved > now) return saved;
    const end = now + FIFTEEN_MINUTES;
    sessionStorage.setItem(KEY, String(end));
    return end;
  }

  let endTime = getEndTime();

  function updateCountdowns() {
    let remaining = Math.max(0, endTime - Date.now());
    if (remaining === 0) {
      endTime = Date.now() + FIFTEEN_MINUTES;
      sessionStorage.setItem(KEY, String(endTime));
      remaining = FIFTEEN_MINUTES;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    document.querySelectorAll("[data-hours]").forEach(el => { el.textContent = hours; });
    document.querySelectorAll("[data-minutes]").forEach(el => { el.textContent = minutes; });
    document.querySelectorAll("[data-seconds]").forEach(el => { el.textContent = seconds; });
  }

  document.querySelectorAll(".accordion details").forEach(item => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      document.querySelectorAll(".accordion details").forEach(other => {
        if (other !== item) other.open = false;
      });
    });
  });

  updateCountdowns();
  setInterval(updateCountdowns, 1000);
})();
