const btnGenerate = document.querySelector('#generate-pdf');
const conteudo = document.querySelector('#conteudo');
const data = new Date();
const nomeRelatório = data.toLocaleDateString("pt-BR", { year:'numeric', month: 'numeric', day: 'numeric' });

btnGenerate.addEventListener('click', async () => {
  const screenWidth = window.innerWidth;
  const isMobile = screenWidth <= 768; // Verifica se é um dispositivo móvel
  const scale = isMobile ? 0.7 : 1; // Ajusta a escala para dispositivos móveis

  const options = {
    margin: [2, 2, 2, 2],
    filename: `Relatório_Estoque_${nomeRelatório}.pdf`,
    html2canvas: { scale: scale },
    jsPDF: { unit: 'mm', format: 'a4', orientation: isMobile ? 'portrait' : 'landscape' }
  }

  // Gerar pdf
  await html2pdf().set(options).from(conteudo).save();

  Swal.fire({
    title: "PDF gerado com sucesso!",
    icon: "success",
    confirmButtonColor: "#0275d8",
  });
});
