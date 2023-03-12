let blogList = [];
async function getBlogs() {
  await fetch("http://localhost:3000/blogs")
    .then((res) => res.json())
    .then((data) => {
      blogList = data;
      console.log(blogList);
    });
}

function createBlogItem(obj) {
  let blogItemEl = document.createElement("div");
  blogItemEl.classList = "blog--list__item";
  blogItemEl.innerHTML = `
    <div class="blog--list__item--image">
    <a href=""><img
            src="${obj.img}"
            alt=""></a>
    </div>
    <div class="blog--list__item--text">
    <h3 class="blog--list__item--text__title">
        <a href="#">${obj.title}</a>
    </h3>
    <p class="blog--list__item--text__desc">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
    </p>
    <span class="blog--list__item--text__foot">
        <span class="date">${obj.date}</span>•<span class="comments">${
    obj.comments.length == 0 ? "Şərh yoxdur" : obj.comments.length + "Şərh"
  }</span>
    </span>
    </div>
  `;
  return blogItemEl;
}

function createBlogProduct() {
  let blogProductParentEl = document.createElement("div");
  blogProductParentEl.classList = "blog--list__product";
  let random;
  for (let i = 0; i < 2; i++) {
    while (true) {
      random = Math.floor(Math.random() * 150);
      if (!productList[random].inStock) {
        break;
      }
    }
    let obj = productList[random];
    let blogProductChildEl = document.createElement("div");
    blogProductChildEl.classList = "blog--list__product--content";
    blogProductChildEl.innerHTML = `
        <div class="blog--list__product--img">
            <a href="../singleProduct/singleProduct.html?id=${obj.id}"><img
                    src="${obj.img[0]}"
                    alt="product"></a>
        </div>
        <div class="blog--list__product--title">
            <h2><a href="../singleProduct/singleProduct.html?id=${obj.id}">${
      obj.title.length > 18 ? obj.title.slice(0, 15) + "..." : obj.title
    }</a></h2>
        </div>
        <p class="blog--list__product--price">
            ₼<span class="price">${obj.price}</span>
        </p>
        <div class="stars">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
        </div>
    `;
    blogProductParentEl.append(blogProductChildEl);
  }
  return blogProductParentEl;
}

function blogListConfigure() {
  let blogListContent = $(".blog--list__content");
  let loopCount = blogList.length + blogList.length / 3;
  let blogCount = 0;
  for (let i = 1; i <= loopCount; i++) {
    if (i % 4 == 0) {
      blogListContent.appendChild(createBlogProduct());
    } else {
      blogListContent.appendChild(createBlogItem(blogList[blogCount]));
      blogCount++;
    }
  }
}

window.onload = async function () {
  await onloadFunction();
  await getBlogs();
  blogListConfigure();
};
