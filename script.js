// Caminho dos arquivos de markdown
const posts = [
  'posts/post1.md',
  'posts/post2.md',
  'posts/post3.md',
  'posts/post4.md',
  'posts/post5.md',
  'posts/post6.md'
];

const postsPerPage = 5;
let currentPage = 1;

function loadPosts(page) {
  const postsContainer = document.getElementById('posts-container');
  postsContainer.innerHTML = ''; // Limpa posts anteriores

  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;

  // Carrega os posts na ordem definida no array
  const postsToLoad = posts.slice(start, end);

  postsToLoad.forEach(post => {
      fetch(post)
          .then(response => response.text())
          .then(data => {
              const postElement = document.createElement('div');
              postElement.classList.add('post');
              postElement.innerHTML = marked.parse(data); // Converte markdown para HTML
              postsContainer.appendChild(postElement);
          });
  });

  updatePagination();
}

function updatePagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = ''; // Limpa paginação anterior

  const totalPages = Math.ceil(posts.length / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      if (i === currentPage) {
          button.classList.add('disabled');
      }
      button.addEventListener('click', () => {
          currentPage = i;
          loadPosts(currentPage);
      });
      pagination.appendChild(button);
  }
}

// Inicializa carregando a primeira página
loadPosts(currentPage);
