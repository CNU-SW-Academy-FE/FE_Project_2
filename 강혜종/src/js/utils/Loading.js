// export default function Loading({ $target }) {
//     const $loading = document.createElement('div')
//     $loading.className = 'Loading Modal'
//     $target.appendChild($loading)

//     this.state = false

//     this.setState = nextState => {
//         this.state = nextState
//         this.render()
//     }

//     this.render = () => {
//         $loading.innerHTML = `
//             <div class="content">
//                 <img width="400px" src="https://cat-photos-dev-serverlessdeploymentbucket-fdpz0swy5qxq.s3.ap-northeast-2.amazonaws.com/public/images/file.png"
//                     alt="Loading..."
//                 />
//             </div>
//         `
//         $loading.style.display = this.state ? 'block' : 'none'
//     }

//     this.render()
// }