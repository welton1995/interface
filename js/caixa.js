const url = `https://backend-interface-theta.vercel.app`;

const tipoModal = document.querySelector('#tipo');
const categoriaModal = document.querySelector('#categoria');
const observacaoModal = document.querySelector('#observacao');
const valorModal = document.querySelector('#valor');
const dataModal = document.querySelector('#data');
const btnModal = document.querySelector('#btnModal');
const btnEditar = document.querySelector('#btnEditar');
const loading = document.querySelector('#loading');
const loading1 = document.querySelector('#loading1');


// CRIAR UMA NOVA TRANSAÇÃO ===========================================================================================
const salvasTransacao = async () => {
    if(!valorModal.value) {
      valorModal.focus();
      return alert('Preencha o valor e tente novamente!');
    }

    if(categoriaModal.value === 'Selecione uma categoria'){
      return categoriaModal.focus();
    }

  const dados = {
    tipo: tipoModal.value,
    categoria: categoriaModal.value,
    observacao: observacaoModal.value,
    valor: valorModal.value,
    data: dataModal.value
  }

  const opcoesRequisicao = {
    method: "POST",
    body: JSON.stringify(dados),
    headers: {
      "Content-Type": "Application/json"
    }
  }

  const resultado = await fetch(`${url}/transacoes`, opcoesRequisicao);
  const resposta = await resultado.json();

  if(resposta === 'Transação criada com sucesso!'){
   await Swal.fire({
      title: "Transação criada com sucesso!",
      icon: "success",
      confirmButtonColor: "#0275d8",
    });
    return window.location.reload();
  }
}

btnModal.addEventListener('click', (e)=> {
  e.preventDefault();
  try {
    salvasTransacao();
  } catch (error) {
    return console.log(error);
  }
});


// LISTAR TODAS AS TRANSAÇÕES ===================================================================================
const listarTransacoes = async () => {
  try {
    loading1.style.display = 'block';
    const tabela = document.querySelector('#tabelaTransacao');
    const resultado = await fetch(`${url}/transacoes`);
    const resposta = await resultado.json();

    resposta.transacoes.reverse().forEach(transacao => {
      const conteudo = document.createElement('tr');

      conteudo.innerHTML = `
                              <td class="text-center align-middle">${transacao.tipo}</td>
                              <td class="text-center align-middle">${transacao.categoria}</td>
                              <td class="text-center align-middle">${transacao.observacao}</td>
                              <td class="text-center align-middle">${transacao.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                              <td class="text-center align-middle">${new Date(transacao.data).toLocaleDateString('pt-BR')}</td>
                              <td class="text-center align-middle">
                                <a href="./editarTransacao.html?id=${transacao._id}"><img src="../img/editar.png" width="24px" title="Entrada de Estoque" class="icon"></a>
                                <a href="./excluirTransacao.html?id=${transacao._id}&tipo=${transacao.tipo}&categoria=${transacao.categoria}&observacao=${transacao.observacao}&valor=${transacao.valor}&data=${transacao.data}"><img src="../img/lixeira.png" width="24px" title="Remover Chave" class="icon"></a>
                              </td>
      `
      tabela.appendChild(conteudo);
    });
    loading1.style.display = 'none';

  } catch (error) {
    return console.log(error);
  }
}

listarTransacoes();

// SALDO
const diferancaMeses = async () => {
  try {
    const meses = document.querySelector('#meses');
    const resultado = await fetch(`${url}/transacoes/saldomeses`);
    const resposta = await resultado.json();

    meses.innerHTML = `
                    <td class="text-center align-middle"></td>
                    <td class='line'>${resposta.resultado[0].diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td class='line'>${resposta.resultado[1].diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td class='line'>${resposta.resultado[2].diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td class='line'>${resposta.resultado[3].diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td class='line'>${resposta.resultado[4].diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td class='line'>${resposta.resultado[5].diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td class='line'>${resposta.resultado[6].diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td class='line'>${resposta.resultado[7].diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td class='line'>${resposta.resultado[8].diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td class='line'>${resposta.resultado[9].diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td class='line'>${resposta.resultado[10].diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td class='line'>${resposta.resultado[11].diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
    `

  } catch (error) {
    return console.log(error);
  }
}

diferancaMeses();

// SERVIÇOS SOMA POR MES
const servicosMeses = async () => {
  try {
    loading.style.display = 'block'
    const servicos = document.querySelector('#servicos');
    const resultado = await fetch(`${url}/transacoes/servicosmeses`);
    const resposta = await resultado.json();

    servicos.innerHTML = `
                    <td class="text-center align-middle" >Serviços</td>
                    <td>${resposta.resultado[0].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[1].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[2].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[3].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[4].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[5].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[6].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[7].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[8].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[9].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[10].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[11].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
    `
    loading.style.display = 'none'

  } catch (error) {
    return console.log(error);
  }
}

servicosMeses();

// VENDAS SOMA POR MES
const vendasMeses = async () => {
  try {
    const vendas = document.querySelector('#vendas');
    const resultado = await fetch(`${url}/transacoes/vendasmeses`);
    const resposta = await resultado.json();

    vendas.innerHTML = `
                    <td class="text-center align-middle" >Vendas</td>
                    <td>${resposta.resultado[0].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[1].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[2].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[3].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[4].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[5].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[6].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[7].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[8].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[9].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[10].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[11].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
    `
  } catch (error) {
    return console.log(error);
  }
}

vendasMeses();

// OUTROS SOMA POR MES
const outrosMeses = async () => {
  try {
    const outros = document.querySelector('#outros');
    const resultado = await fetch(`${url}/transacoes/outrosMeses`);
    const resposta = await resultado.json();

    outros.innerHTML = `
                    <td class="text-center align-middle" >Outros</td>
                    <td>${resposta.resultado[0].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[1].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[2].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[3].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[4].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[5].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[6].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[7].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[8].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[9].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[10].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[11].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
    `
  } catch (error) {
    return console.log(error);
  }
}

outrosMeses();

// LUZ SOMA POR MES
const luzMeses = async () => {
  try {
    const luz = document.querySelector('#luz');
    const resultado = await fetch(`${url}/transacoes/luzmeses`);
    const resposta = await resultado.json();

    luz.innerHTML = `
                    <td class="text-center align-middle" >Luz</td>
                    <td>${resposta.resultado[0].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[1].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[2].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[3].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[4].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[5].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[6].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[7].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[8].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[9].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[10].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[11].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
    `
  } catch (error) {
    return console.log(error);
  }
}

luzMeses();

// MATERIA PRIMA POR MES
const materiaPrimaMeses = async () => {
  try {
    const materiaPrima = document.querySelector('#materiaPrima');
    const resultado = await fetch(`${url}/transacoes/materiaprimameses`);
    const resposta = await resultado.json();

    materiaPrima.innerHTML = `
                    <td class="text-center align-middle" >Materia Prima</td>
                    <td>${resposta.resultado[0].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[1].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[2].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[3].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[4].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[5].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[6].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[7].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[8].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[9].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[10].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[11].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
    `
  } catch (error) {
    return console.log(error);
  }
}

materiaPrimaMeses();

// FERRAMENTAS POR MES
const ferramentasMeses = async () => {
  try {
    const ferramentas = document.querySelector('#ferramentas');
    const resultado = await fetch(`${url}/transacoes/ferramentasmeses`);
    const resposta = await resultado.json();

    ferramentas.innerHTML = `
                    <td class="text-center align-middle" >Ferramentas</td>
                    <td>${resposta.resultado[0].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[1].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[2].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[3].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[4].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[5].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[6].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[7].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[8].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[9].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[10].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[11].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
    `
  } catch (error) {
    return console.log(error);
  }
}

ferramentasMeses();

// OUTROS DESPESAS POR MES
const despesasOutrosMeses = async () => {
  try {
    const outros = document.querySelector('#despesasoutros');
    const resultado = await fetch(`${url}/transacoes/despesasoutrosmeses`);
    const resposta = await resultado.json();

    outros.innerHTML = `
                    <td class="text-center align-middle" >Outros</td>
                    <td>${resposta.resultado[0].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[1].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[2].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[3].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[4].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[5].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[6].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[7].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[8].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[9].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[10].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${resposta.resultado[11].totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
    `
  } catch (error) {
    return console.log(error);
  }
}

despesasOutrosMeses();