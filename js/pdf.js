const btnGenerate = document.querySelector('#generate-pdf');
const conteudo = document.querySelector('#conteudo');
const data = new Date();
const nomeRelatório = data.toLocaleDateString("pt-BR", { year:'numeric', month: 'numeric', day: 'numeric' });

btnGenerate.addEventListener('click', async () => {
  const originalFontSize = window.getComputedStyle(conteudo).fontSize;
  
  // Forçar tamanho menor da fonte
  conteudo.style.fontSize = '12px'; // Ajuste para o tamanho desejado

  const options = {
    margin: [2, 2, 2, 2],
    filename: `Relatório_Estoque_${nomeRelatório}.pdf`,
    html2canvas: {
      scale: window.devicePixelRatio, 
      width: conteudo.scrollWidth,
      height: conteudo.scrollHeight,
      windowWidth: conteudo.scrollWidth
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

  await Swal.fire({
    title: "PDF gerado com sucesso!",
    icon: "success",
    confirmButtonColor: "#0275d8",
  });
});


