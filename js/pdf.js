const btnGenerate = document.querySelector('#generate-pdf');
const conteudo = document.querySelector('#conteudo');
const data = new Date();
const nomeRelatório = data.toLocaleDateString("pt-BR", { year:'numeric', month: 'numeric', day: 'numeric' });

btnGenerate.addEventListener('click', async () => {
  const isMobile = window.innerWidth <= 480;
  
  const options = {
    margin: [2, 2, 2, 2],
    filename: `Relatório_Estoque_${nomeRelatório}.pdf`,
    html2canvas: {
      scale: window.devicePixelRatio, // Usa a densidade de pixels para melhorar a resolução
      width: conteudo.scrollWidth, // Força a largura correta
      height: conteudo.scrollHeight, // Força a altura correta
      windowWidth: conteudo.scrollWidth // Evita cortes no conteúdo
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'landscape'
    }
  };

  // Gerar pdf
  await html2pdf().set(options).from(conteudo).save();

  Swal.fire({
    title: "PDF gerado com sucesso!",
    icon: "success",
    confirmButtonColor: "#0275d8",
  });
});
