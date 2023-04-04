export const initRouter = (onRoute) => {
  window.addEventListener("route-change", (e) => {
    const { nextUrl } = e.detail;
  });

  if (nextUrl) {
    history.pushState(null, null, nextUrl);
    onRoute();
  }
};

export const pushUrl = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(
      new CustomEvent("route-change", {
        detail: {
          nextUrl,
        },
      })
    )
  );
};
