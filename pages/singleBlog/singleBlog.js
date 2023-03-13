document.addEventListener("scroll", (e) => {
  if (scrollY > 150) {
    $(".header").classList.add("scroll");
  } else {
    $(".header").classList.remove("scroll");
  }
});

