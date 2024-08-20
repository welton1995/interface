const url = `https://backend-interface-theta.vercel.app`;

const tipoEditar = document.querySelector('#tipo');
const categoriaEditar = document.querySelector('#categoria'); 
const observacaoEditar = document.querySelector('#observacao');
const valorEditar = document.querySelector('#valor');
const dataEditar = document.querySelector('#data');
const btn = document.querySelector('#btnModal');

const urlNavedor = new URL(window.location.href);
const params = new URLSearchParams(urlNavedor.search);

const id = params.get('id');
const tipo = params.get('tipo');
const categoria = params.get('categoria');
const observacao = params.get('observacao');
const valor = params.get('valor');
const data = params.get('data');


dataFormatada = new Date(data).toLocaleDateString('en-CA');

tipoEditar.value = tipo
categoriaEditar.value = categoria
observacaoEditar.value = observacao
valorEditar.value = valor
dataEditar.value = dataFormatada

// Confirmação Bootstrap
const btnExcluir = document.getElementById('btn');
const caixaConfirmacao = document.getElementById('caixaConfirmacao');
const cancelar = document.getElementById('cancelar');
const confirmarExcluir = document.getElementById('confirmarExcluir');

// Mostrar a caixa de confirmação ao clicar no botão "Excluir"
btnExcluir.addEventListener('click', function() {
  caixaConfirmacao.classList.remove('d-none');
});

// Ocultar a caixa de confirmação ao clicar em "Cancelar"
cancelar.addEventListener('click', function() {
  caixaConfirmacao.classList.add('d-none');
});

// Ação de exclusão ao clicar em "Excluir"
confirmarExcluir.addEventListener('click', function() {
  caixaConfirmacao.classList.add('d-none');
  excluirTransacao();
});

// Requisição Excluir 

const excluirTransacao = async ()=> {
  try {
    const opcoesRequisicao = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      }
    }

    const resultado = await fetch(`${url}/transacoes/${id}`, opcoesRequisicao);
    const resposta = await resultado.json();

    if(resposta === 'Transação excluida com sucesso!'){
      alert('Transação excluida com sucesso!');
      window.location.href = "./caixa.html";
    }

    console.log(resposta);

  } catch (error) {
    console.log(error);
  }
}

