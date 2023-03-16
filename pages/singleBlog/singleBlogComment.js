let currentBlog;
let reviewComment = $(".replied--message");
let reviewCommentCloseBtn = reviewComment.querySelector("i");
let singleBlogReplyBtns;

function getItemsForNewComment() {
  singleBlogReplyBtns = document.querySelectorAll(".reply");
}

function addEventReplyBtns() {
  singleBlogReplyBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      setCommentSettings(btn.dataset.parent, btn.dataset.child);
    });
  });
}

async function setCommentSettings(parentIndex, childIndex) {
  let toComment;
  await fetch(fethcUrl + `/blogs?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      currentBlog = data;
    });
  if (childIndex != -1) {
    toComment =
      currentBlog[0].comments[parentIndex - 1].replies[childIndex - 1];
  } else {
    toComment = currentBlog[0].comments[parentIndex - 1];
  }

  //! configure review comment
  reviewComment.querySelector("span").innerHTML = toComment.name;
  reviewComment.querySelector("p").innerHTML =
    toComment.comment.slice(0, 70) + "...";

  //!position window when click reply
  let topPosition = $("textarea").parentNode.offsetTop;
  window.scrollTo(0, topPosition - 400);
  reviewComment.classList.remove("hide");
  $("textarea").focus(); //! focus textarea
}

reviewCommentCloseBtn.addEventListener("click", () =>
  reviewComment.classList.add("hide")
);
