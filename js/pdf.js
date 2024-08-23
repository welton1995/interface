const btnGenerate = document.querySelector('#generate-pdf');
const conteudo = document.querySelector('#conteudo');
const data = new Date();
const nomeRelatório = data.toLocaleDateString("pt-BR", { year: 'numeric', month: 'numeric', day: 'numeric' });

btnGenerate.addEventListener('click', async () => {
  const originalFontSize = window.getComputedStyle(conteudo).fontSize;

  // Forçar tamanho menor da fonte
  conteudo.style.fontSize = '12px'; // Ajuste para o tamanho desejado

  await Swal.fire({
    title: "PDF gerado com sucesso!",
    icon: "success",
    confirmButtonColor: "#0275d8",
  });

  // Ajustar a escala dependendo do tamanho da tela
  const scale = window.innerWidth < 768 ? 1 : 2; // Ajuste de escala para celular e computador

  const options = {
    margin: [2, 2, 2, 2],
    filename: `Relatório_Estoque_${nomeRelatório}.pdf`,
    html2canvas: {
      scale: scale, // Ajuste de escala
      width: conteudo.scrollWidth,
      height: conteudo.scrollHeight,
      windowWidth: window.innerWidth, // Usa a largura da janela ao invés do scrollWidth
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'landscape'
    }
  };

  // Gerar o PDF
  await html2pdf().set(options).from(conteudo).save();

  // Reverter o tamanho da fonte ao original
  conteudo.style.fontSize = originalFontSize;
});
