const ROUTE_CHANGE_EVENT = 'route-change'
const POPSTATE_EVENT = 'popstate'
const TITLE_CHANGE_EVENT = 'title-change'

export const initRouter = onRoute => {
  window.addEventListener(ROUTE_CHANGE_EVENT, (e) => {
    const { nextUrl } = e.detail

    if (nextUrl) {
      history.pushState(null, null, nextUrl)
      onRoute()
    }
  })
}

export const pushUrl = nextUrl => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT, {
      detail: {
        nextUrl,
      },
    }),
  )
}

export const popUrl = onRoute => {
  window.addEventListener(POPSTATE_EVENT, () => {
    onRoute()
  })
}

export const throwTitle = title => {
  window.dispatchEvent(
    new CustomEvent(TITLE_CHANGE_EVENT, {
      detail: {
        title,
      },
    }),
  )
}

export const catchTitle = onUpdate => {
  window.addEventListener(TITLE_CHANGE_EVENT, () => {
    onUpdate()
  })
}
