const ROUTE_CHANGE_EVENT_NAME = 'route-change'
const POPSTATE_EVENT_NAME = 'popstate'
const TITLE_CHANGE_EVENT_NAME = 'title-change'

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail

    if (nextUrl) {
      history.pushState(null, null, nextUrl)
      onRoute()
    }

    const { type } = e.detail
    const { id } = e.detail
    if (type === 'list') {
        history.pushState(null, null, `/${id}`)
        onRoute(null)
    } else if (type === 'remove-btn') {
        request(`/${id}`, {
            method: 'DELETE'
        })
        onRoute(null)
    } else if (type === 'add-btn') {
        history.pushState(null, null, `/new`)
        onRoute(id)
    } else if (type === 'header') {
        history.pushState(null, null, `/`)
        onRoute(null)
    }
  })
}

export const pushUrl = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent('route-change', {
      detail: {
        nextUrl,
      },
    }),
  )
}

export const popUrl = (onRoute) => {
  window.addEventListener(POPSTATE_EVENT_NAME, () => {
    onRoute()
  })
}

export const throwTitle = (title) => {
  window.dispatchEvent(
    new CustomEvent(TITLE_CHANGE_EVENT_NAME, {
      detail: {
        title,
      },
    }),
  )
}

export const catchTitle = (onUpdate) => {
  window.addEventListener(TITLE_CHANGE_EVENT_NAME, () => {
    onUpdate()
  })
}
