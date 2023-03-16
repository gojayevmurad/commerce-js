document.addEventListener("scroll", (e) => {
  if (scrollY > 150) {
    $(".header").classList.add("scroll");
  } else {
    $(".header").classList.remove("scroll");
  }
});

let blogs = [];

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function getBlog() {
  await fetch(fethcUrl + `/blogs`)
    .then((res) => res.json())
    .then((data) => {
      blogs = data;
    });
}

//! Set blog Page Intro

function setBlogPageHeader() {
  $(".blogpage--header > img").src = blogs[id - 1].img;
  $(".blogpage--header__title").innerText = blogs[id - 1].title;
  // $(".blogpage--header__content .comments").innerText = ;
  $(".blogpage--header__content .date").innerText = blogs[id - 1].date;
}

//! Set Blog Author

function setBlogTextContentTitle() {
  $(".writer > img").src = blogs[id - 1].author.photo;
  $(".writer .name").innerText = blogs[id - 1].author.name;
}

//! Set Comments

let commentsList = $(".comments--list");

function createBlogTextComment(comment, nth) {
  let commentEl = document.createElement("li");
  commentEl.classList = "comment-list__item";
  let commentParent = document.createElement("div");
  commentParent.id = `comment${nth}`;
  commentParent.classList = "comment--list__item--parent";
  commentParent.innerHTML = `
  <div class="img">
    <img src="${comment.userImg}"
        alt="pp" class="userlogo">
  </div>
  <div class="comment--list__item--parent__content">
    <h3 class="name">${comment.name}</h3>
    <p><span class="date">${comment.date}</span><a href="#" class="reply">Reply</a>
    </p>
    <span class="comment--data">
        ${comment.comment}
    </span>
  </div>
  `;
  commentEl.appendChild(commentParent);

  if (comment.replies.length) {
    let parentElChildsComments = document.createElement("ul");
    parentElChildsComments.classList = "comment--list__item--children";
    comment.replies.forEach((childComment, index) => {
      console.log(childComment.for);
      let childEl = document.createElement("li");
      childEl.classList = "comment--list__item--children__comment";
      childEl.id = `comment${nth}child${index + 1}`;
      childEl.innerHTML = `
      <a class="position--a" href="${
        childComment.for
          ? `#comment${nth}child${childComment.for}`
          : `#comment${nth}`
      }"><i class="fa-solid fa-reply-all whichcomment" ></i></a>
      <div class="img">
          <img src="${childComment.userImg}"
              alt="pp" class="userlogo">
      </div>
      <div class="comment--list__item--children__comment--content">
          <h3 class="name">${childComment.name}</h3>
          <p><span class="date">${childComment.date}</span> <a class="" href="#"
                  class="reply">Reply</a>
          </p>
          <span class="comment--data">
              ${childComment.comment}
          </span>
      </div>
      `;
      parentElChildsComments.appendChild(childEl);
    });
    commentEl.appendChild(parentElChildsComments);
  }
  return commentEl;
}

function setBlogTextComment() {
  blogs[id - 1].comments.forEach((comment, index) => {
    let element = createBlogTextComment(comment, index + 1);
    commentsList.appendChild(element);
  });

  showOwnerComm();
}

function showOwnerComm() {
  document.querySelectorAll(".position--a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      $(`${el.getAttribute("href")}`).style.backgroundColor = "#6CB4EE";
      setTimeout(() => {
        $(`${el.getAttribute("href")}`).style.backgroundColor = "#fff";
      }, 350);
    });
  });
}

//* Aside section

function setBlogs() {
  let asideBlogList = $(".aside--bloglist");
  let randomNums = [];

  for (let i = 0; i < 3; i++) {
    let random = Math.floor(Math.random() * 6);
    if (randomNums.includes(random)) {
      i--;
      continue;
    }
    randomNums.push(random);
    let asideBlogItem = document.createElement("div");
    asideBlogItem.classList = "aside--blog";
    let randomBlogItem = blogs[random];

    asideBlogItem.innerHTML = `
      <div class="img">
        <a href="./singleBlog.html?id=${randomBlogItem.id}">
          <img src="${randomBlogItem.img}"
              alt="blog header">
        </a>
      </div>
      <div class="aside--blog__content">
          <h4><a href="./singleBlog.html?id=${randomBlogItem.id}">${
      randomBlogItem.title.length > 50
        ? randomBlogItem.title.slice(0, 47) + "..."
        : randomBlogItem.title
    }</a></h4>
          <p>
              <span class="aside--blog__date"> ${
                randomBlogItem.date
              } </span> | Şərhlər: <span
                  class="aside--blog__comments">0</span>
          </p>
      </div>
    `;
    asideBlogList.appendChild(asideBlogItem);
  }
}

//* add product to local storage like recent view

function getRecentViews() {
  let recentviewed = JSON.parse(localStorage.getItem("recentviewed"));
  return recentviewed;
}

function setRecentViews() {
  let recentViewedEl = $(".aside--recentviewed");
  let arr = getRecentViews();
  if (!arr) {
    recentViewedEl.style.display = "none";
    return;
  }
  recentViewedEl.innerHTML =
    '<h3 class="box--header">Son Baxılan Məhsullar</h3>';

  arr.forEach((item) => {
    let recViewEl = document.createElement("div");
    recViewEl.classList = "aside--recentviewed__product";
    recViewEl.innerHTML = `
        <div class="gotopage">
          <a href="../singleProduct/singleProduct.html?id=${item}">Məhsul Səhifəsinə Keç</a>
        </div>
        <div class="product--image">
            <img src="${productList[item - 1].img[0]}"
                alt="first">
        </div>
        <div class="product--text">
            <p class="product--name">
                ${productList[item - 1].title}
            </p>
            <p>
                ₼<span class="product--price">${
                  productList[item - 1].price
                }</span>
            </p>
        </div>
        `;
    recentViewedEl.appendChild(recViewEl);
  });
}

window.onload = async function () {
  await onloadFunction();
  setPromotionSection();
  await getBlog();
  createBlogTextComment(blogs[id - 1].comments[0]);
  setBlogPageHeader();
  setBlogTextContentTitle();
  setBlogTextComment();
  setBlogs();
  setRecentViews();
};
