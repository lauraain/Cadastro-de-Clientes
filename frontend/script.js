// Verifica se está na página de cadastro
if (document.getElementById('formCadastro')) {
  document.getElementById('formCadastro').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    const response = await fetch('http://localhost:3000/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, telefone })
    });

    if (response.ok) {
      alert('Cliente cadastrado com sucesso!');
      this.reset();
    } else {
      alert('Erro ao cadastrar cliente.');
    }
  });
}

// Verifica se está na página da lista
if (document.getElementById('listaClientes')) {
  async function carregarClientes() {
    const response = await fetch('http://localhost:3000/api/clientes');
    const clientes = await response.json();

    const lista = document.getElementById('listaClientes');
    lista.innerHTML = '';
    clientes.forEach(c => {
      const li = document.createElement('li');
      li.textContent = `${c.nome} - ${c.email} - ${c.telefone}`;
      lista.appendChild(li);
    });
  }

  carregarClientes();
}
