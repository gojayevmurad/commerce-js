let currentBlog;
let reviewComment = $(".replied--message");
let reviewCommentCloseBtn = reviewComment.querySelector("i");
let singleBlogReplyBtns;
let isReply = false;
let replyTo = null;

async function getCurrenBlog() {
  await fetch(fethcUrl + `/blogs?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      currentBlog = data;
    });
}
fetch(fethcUrl + `/blogs?id=${id}`)
  .then((res) => res.json())
  .then((data) => {
    currentBlog = data;
  });
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

  isReply = true;

  replyTo = {
    parentIndex: Number(parentIndex),
    childIndex: Number(childIndex),
  };
}

reviewCommentCloseBtn.addEventListener("click", () => {
  reviewComment.classList.add("hide");
  resetCommentForm();
});



$(".form--comment").addEventListener("submit", async (e) => {
  e.preventDefault();
  let name = e.target.name.value;
  let email = e.target.email.value;
  let textarea = e.target.reply.value;

  

  // currentBlog.comments[replyTo.parentIndex - 1].replies[replyTo.childIndex - 1];

  if (isReply) {
    currentBlog[0].comments[replyTo.parentIndex - 1].replies.push({
      id: currentBlog[0].comments[replyTo.parentIndex - 1].replies.length + 1,
      name: name,
      comment: textarea,
      userImg:
        "https://www.gravatar.com/avatar/e647b85d28047927c3259f77bc48e16c?d=identicon&s=30",
      date: new Date().getFullYear(),
      email: email,
      for: replyTo.childIndex,
    });
  } else {
    currentBlog[0].comments.push({
      id: currentBlog[0].comments.length + 1,
      name: name,
      comment: textarea,
      userImg:
        "https://www.gravatar.com/avatar/e647b85d28047927c3259f77bc48e16c?d=identicon&s=30",
      date: new Date().getFullYear(),
      email: email,
      replies: [],
    });
  }

  await fetch(fethcUrl + `/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      ...currentBlog[0],
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).finally((data) => {
    createNotification("success", "Şərhiniz əlavə olundu");
  });
  resetCommentForm();
  reRenderComments();
});

function resetCommentForm() {
  let form = $(".form--comment");
  form.name.value = "";
  form.email.value = "";
  form.reply.value = "";
  isReply = false;
  replyTo = null;
  reviewComment.classList.add("hide");
}

async function reRenderComments() {
  await getBlog();
  setBlogTextComment();
  getItemsForNewComment();
  addEventReplyBtns();
  setCommentsCount();
}
