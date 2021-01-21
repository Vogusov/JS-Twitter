class FetchData {
  getResource = async url => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Ошибка: ' + res.status)
    }

    return res.json();
  }

  getPost = () => this.getResource('db/dataBase.json')

}

// const obj = new FetchData()
// obj.getPost().then((data) => {
//   console.log(data);
// });



class Twitter {
  constructor({
    listElem
  }) {
    const fetchData = new FetchData();
    this.tweets = new Posts();
    this.elements = {
      listElem: document.querySelector(listElem),
    }

    fetchData.getPost()
      .then((data) => {
        console.log('Our twits: ', data);
        data.forEach(element => {
          this.tweets.addPost(element)
          this.showAllPosts()
        });
      });
  }

  renderPosts(tweets) {
    this.elements.listElem.textContent = '';

    tweets.forEach(({
      id,
      userName,
      nickname,
      postDate,
      text,
      img,
      likes
    }) => {
      this.elements.listElem.insertAdjacentHTML('beforeend', `
        <li>
          <article class="tweet">
            <div class="row">
              <img class="avatar" src="images/${nickname}.jpg" alt="Аватар пользователя ${nickname}">
              <div class="tweet__wrapper">
                <header class="tweet__header">
                  <h3 class="tweet-author">${userName}
                    <span class="tweet-author__add tweet-author__nickname">@${nickname}</span>
                    <time class="tweet-author__add tweet__date">${postDate}</time>
                  </h3>
                  <button class="tweet__delete-button chest-icon data-id="${id}"></button>
                </header>
                <div class="tweet-post">
                  <p class="tweet-post__text">${text}</p>
                  ${img ?
                    `<figure class="tweet-post__image">
                      <img src="${img}" alt="картинка ${userName}">
                    </figure>` :
                ''}
                </div>
              </div>
            </div>
            <footer>
              <button class="tweet__like">
                ${likes}
              </button>
            </footer>
          </article>
        </li>`)
    })
  }

  showUserPost() {

  }

  showLikedPosts() {

  }

  showAllPosts() {
    this.renderPosts(this.tweets.posts)
  }

  openModal() {

  }

}

class Posts {
  constructor({
    posts = []
  } = {}) {
    this.posts = posts;
  }

  addPost(tweet = {}, i, arr) {
    const post = new Post(tweet);
    this.posts.push(post);
  }

  deletePost(id) {

  }
}

class Post {
  constructor({
    id,
    userName,
    nickname,
    postDate,
    text,
    img,
    likes = 0
  }) {
    this.id = id || this.generateID();
    this.userName = userName;
    this.nickname = nickname;
    this.postDate = postDate;
    this.text = text;
    this.img = img;
    this.likes = likes;
    this.liked = false;
  }

  changeLike() {
    this.liked = !this.liked;
    if (this.like == !this.like) {
      if (this.liked) {
        this.likes++;
      } else {
        this.likes--;
      }
    }
  }

  generateID() {
    return Math.random().toString(32).substring(2, 9) + (+new Date).toString(32);
  }

  getDate() {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
    return this.postDate.toLocalString('ru-RU', options)
  }
}


// проверка
const twitter = new Twitter({
  listElem: '.tweet-list'
})

// twitter.tweets.addPost({
//     nickname: 'Ditrich88',
//     userName: 'Anton'
//   }

// );

// twitter.tweets.addPost();

// twitter.tweets.addPost();

// twitter.tweets.addPost();



// console.log(twitter.tweets);

// console.log((+new Date).toString(32) );
// console.log(Math.random().toString(32).substring(2, 9) + (+new Date).toString(32));