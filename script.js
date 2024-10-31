const postsPerPage = 5;
let currentPage = 1;
let posts = [];

async function loadPosts() {
  const response = await fetch("posts/posts.json");
  posts = await response.json();
  renderPosts();
  renderPagination();
}

function renderPosts() {
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";

  posts.slice(start, end).forEach(async (post) => {
    const postElement = document.createElement("div");
    postElement.className = "post";

    const postContent = await fetch(`posts/${post}`);
    const markdown = await postContent.text();
    postElement.innerHTML = marked(markdown);

    postsContainer.appendChild(postElement);
  });
}

function renderPagination() {
  const pageCount = Math.ceil(posts.length / postsPerPage);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.className = i === currentPage ? "active" : "";
    button.addEventListener("click", () => {
      currentPage = i;
      renderPosts();
      renderPagination();
    });
    paginationContainer.appendChild(button);
  }
}

document.addEventListener("DOMContentLoaded", loadPosts);