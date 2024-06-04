document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const listaUsuarios = document.getElementById('lista-usuarios');
  
    // Função para buscar dados
    const buscarDados = () => {
      fetch('/dados')
        .then(response => response.json())
        .then(data => {
          listaUsuarios.innerHTML = '';
          data.forEach(usuario => {
            const li = document.createElement('li');
            li.textContent = `${usuario.nome} - ${usuario.email}`;
            listaUsuarios.appendChild(li);
          });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
    };
  
    // Função para adicionar dado
    const adicionarDado = (event) => {
      event.preventDefault();
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
  
      fetch('/dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email })
      })
        .then(response => response.text())
        .then(message => {
          console.log(message);
          buscarDados(); // Atualiza a lista após adicionar o dado
        })
        .catch(error => console.error('Erro ao adicionar dado:', error));
    };
  
    formulario.addEventListener('submit', adicionarDado);
    buscarDados(); // Busca dados ao carregar a página
  });
  