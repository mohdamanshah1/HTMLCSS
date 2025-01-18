let index = 1;

createPost();


setInterval(createPost, 1000);


function setDate(node) {
    const postDate = node.querySelector('.postDate');
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    postDate.innerText = today;
}


function setPoster(poster, data, image) {
    const name = poster.querySelector('.posterName');
    const posterImage = poster.querySelector('.profileImage img');
    posterImage.src = image;
    name.innerText = data.first;
}

function addEventToLikeButton(node) {
    const button = node.querySelector('.likeButton');
    button.addEventListener('click', e => {
        button.classList.toggle('liked');
    })
}



function addEventToCommentForm(node) {
    const form = node.querySelector('.commentForm');
    const data = node.querySelector('.commentInput');
    const wrapper = node.querySelector('.commentList')
    form.addEventListener('submit', e => {
        e.preventDefault();
        const li = document.createElement('li');
        li.classList.add('comment');
        li.innerText = data.value;
        wrapper.appendChild(li);
        e.target.reset();
    })
}
let prev = {
    c: null,
    o: false
};
function addEventToLoadCommentButton(node) {
    const loadcommentbutton = node.querySelector('.loadCommentsButton');
    loadcommentbutton.addEventListener('click', e => {
        if (prev.c !== loadcommentbutton) {
            if (prev.c && prev.o) {
                prev.c.click();
            }
        }

        const imageSection = e.target.closest('.postImage');
        const commentSection = imageSection.nextElementSibling;
        imageSection.classList.toggle('shiftLeft');
        commentSection.classList.toggle('shiftRight');
    });
}

async function createPost() {
    const response = await fetch('https://randomuser.me/api/');
    const userData = await response.json();

    const template = document.getElementById('nodetemplate');
    const postWrapper = document.getElementById('posts');
    const newnode = template.content.cloneNode(true);

    setDate(newnode);
    setPoster(newnode, userData.results[0].name, userData.results[0].picture.large);
    addEventToLikeButton(newnode);
    addEventToCommentForm(newnode);
    addEventToLoadCommentButton(newnode);


    index = (index) % 500;
    newnode.querySelector('.imgWrapper img').src = `https://picsum.photos/1000?random=${index}`;
    index++;

    postWrapper.appendChild(newnode);
}



