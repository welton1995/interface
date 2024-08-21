const btnGenerate = document.querySelector('#generate-pdf');
const conteudo = document.querySelector('#conteudo');
const data = new Date();
const nomeRelatório = data.toLocaleDateString("pt-BR", { year:'numeric', month: 'numeric', day: 'numeric' })

btnGenerate.addEventListener('click', async ()=> {
  const options = {
  margin: [2, 2, 2, 2],
  filename: `Relatório_Estoque_${nomeRelatório}.pdf`,
  html2canvas: {scale: 2},
  jsPDF: {unit: 'mm', format: 'a4', orientation: 'landscape'}
}

// Gerar pdf
await html2pdf().set(options).from(conteudo).save();

Swal.fire({
  title: "PDF gerado com sucesso!",
  icon: "success",
  confirmButtonColor: "#0275d8",
});

});