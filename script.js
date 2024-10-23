document.addEventListener('DOMContentLoaded', function() {
    const postList = document.getElementById('post-list');
    const postContent = document.getElementById('post-content');
    
    // Lista de posts (manualmente aqui, mas você pode automatizar com um backend)
    const posts = [
        { title: 'Post 1', file: 'post1.md' },
        { title: 'Post 2', file: 'post2.md' }
    ];

    // Renderizar lista de posts no menu
    posts.forEach(post => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = post.title;
        a.addEventListener('click', () => loadPost(post.file));
        li.appendChild(a);
        postList.appendChild(li);
    });

    // Função para carregar o post
    function loadPost(postFile) {
        fetch(`posts/${postFile}`)
            .then(response => response.text())
            .then(text => {
                const htmlContent = marked(text);
                postContent.innerHTML = htmlContent;
            })
            .catch(err => {
                postContent.innerHTML = '<p>Erro ao carregar o post.</p>';
            });
    }
});