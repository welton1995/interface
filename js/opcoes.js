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
