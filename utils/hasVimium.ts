export function hasVimium(): boolean {
  const spy = document.createElement("div");
  try {
    spy.className = "vimiumReset";
    spy.setAttribute("style", "display: none");
    document.body.appendChild(spy);

    const isInstalled = window.getComputedStyle(spy).zIndex === "2140000000";
    document.body.removeChild(spy);
    return isInstalled;
  } catch (err) {
    document.body.removeChild(spy);
    return false;
  }
}
