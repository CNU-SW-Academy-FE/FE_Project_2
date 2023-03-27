import PostList from "./components/PostList.js";

const DUMMY_DATA = [
    {
        "id": 1,
        "title": "test",
        "documents": [
            {
                "id": 4,
                "title": "test4",
                "documents": []
            }
        ]
    }, 
    {
        "id": 2,
        "title": "test2",
        "documents": [
            
        ]
    }, 
    {
        "id": 3,
        "title": "test3",
        "documents": [
            
        ]
    }, 
]

const $target = document.querySelector('#app');

new PostList({
    $target,
    initialState: DUMMY_DATA
});