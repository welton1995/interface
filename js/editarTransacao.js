const url = `https://backend-interface-theta.vercel.app`;

const tipoEditar = document.querySelector('#tipo');
const categoriaEditar = document.querySelector('#categoria'); 
const observacaoEditar = document.querySelector('#observacao');
const valorEditar = document.querySelector('#valor');
const dataEditar = document.querySelector('#data');
const btn = document.querySelector('#btnModal');


const urlNavegador = new URL(window.location.href);
const params = new URLSearchParams(urlNavegador.search);
const id = params.get('id');


// EDITAR TRANSAÇÕES ===========================================================================================
const editarTransacoes = async () => {

  try {

    if(!valorEditar.value){
      valorEditar.focus();
      return alert("Preencha os campos corretamente e tente novamente!");
    }

    if(!dataEditar.value){
      dataEditar.focus();
      return alert("Preencha os campos corretamente e tente novamente!");

    }

  const dados = {
    tipo: tipoEditar.value,
    categoria: categoriaEditar.value,
    observacao: observacaoEditar.value,
    valor: valorEditar.value,
    data: dataEditar.value,
  }

  const opcoesRequisicao = {
    method: "PUT",
    body: JSON.stringify(dados),
    headers: {
      "Content-Type": "Application/json"
    }
  }

  const resultado = await fetch(`${url}/transacoes/${id}`, opcoesRequisicao);
  const resposta = await resultado.json();

  if(categoriaEditar.value === 'Selecione uma categoria'){
    return categoriaEditar.focus();
  }

  if(resposta === 'Transação atualizada com sucesso!'){
    alert('Transação atualizada com sucesso!');
    return window.location.href = './caixa.html';
  }

  } catch (error) {
    return console.log(error);
  }
}

btn.addEventListener("click", editarTransacoes);

// INPUT SELECT =======================================

const tipoSelect = document.getElementById('tipo');
const categoriaSelect = document.getElementById('categoria');

const categoriasReceitas = ['Serviços', 'Vendas', 'Outros'];
const categoriasDespesas = ['Luz', 'Matéria Prima', 'Ferramentas', 'Outros'];

tipoSelect.addEventListener('change', function() {
  // Limpa as opções do select de categoria
  categoriaSelect.innerHTML = '<option value="Selecione uma categoria">Selecione uma categoria</option>';

  // Obtém o valor selecionado
  const tipo = tipoSelect.value;

  let categorias = [];

  // Define as categorias com base no tipo selecionado
  if (tipo === 'Receitas') {
    categorias = categoriasReceitas;
  } else if (tipo === 'Despesas') {
    categorias = categoriasDespesas;
  }

  // Adiciona as opções ao select de categoria
  categorias.forEach(categoria => {
    const option = document.createElement('option');
    option.textContent = categoria;
    categoriaSelect.appendChild(option);
  });
});
