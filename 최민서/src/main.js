// import App from './Components/App.js'
import PostList from './Components/SideBar/PostList.js'

const DUMMY_DATA = [
  {
    'id': 1,
    'title': 'test1',
    'documents': [
      {
        'id': 2,
        'title': 'blabla',
        'documents': [
          {
            'id': 3,
            'title': 'yumyum',
            'documents': []
          }
        ]
      }
    ]
  },
  {
    'id': 4,
    'title': 'test2',
    'documents': []
  },
]

const $app = document.querySelector('#app')

new PostList({ $target: $app, initialState: DUMMY_DATA })
// new App({
//   $target: $app,
//   initialState: DUMMY_DATA
// })
