
export default function Router({
    $target,
    onRoute
}) {

    this.route = async () => {
        const { pathname } = window.location;

        if (pathname === '/') {
          onRoute(null);
        } else if (pathname.indexOf('/documents/') === 0) {
          const id = pathname.split('/')[2];
          onRoute(id);
        } else {
          $target.innerHTML = "<h1>잘못된 경로</h1>";
        }
    }
    
    window.addEventListener('popstate', async (e) => {
        const pathname = e.target.location.href.replace(location.origin, "");
        let id = null;
        if (pathname.indexOf('/documents/') === 0) {
          id = pathname.split('/')[2];
        }
       onRoute(id);
    })

    this.route();
}