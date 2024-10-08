document.addEventListener("DOMContentLoaded", function() {
    const postContainer = document.getElementById('post-container');
    
    // Lista de arquivos HTML de posts
    const posts = [
        'posts/post1.html',
        'posts/post2.html'
    ];

    // Função para carregar um post
    function loadPost(url) {
        fetch(url)
        .then(response => response.text())
        .then(data => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = data;
            postContainer.appendChild(postDiv);
        })
        .catch(error => console.log('Erro ao carregar o post:', error));
    }

    // Carregar todos os posts
    posts.forEach(post => {
        loadPost(post);
    });
});
