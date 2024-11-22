// Botão de pesquisa
document.querySelector('.btn-outline-secondary').addEventListener('click', function () {
  const query = document.querySelector('.form-control').value;
  if (query.trim() !== "") {
      alert(`Você buscou por: ${query}`);
  } else {
      alert("Por favor, insira algo na barra de pesquisa.");
  }
});

// Adicionar aos favoritos
document.querySelectorAll('.fa-heart').forEach(function (heartIcon) {
  heartIcon.addEventListener('click', function () {
      alert("Filme adicionado aos favoritos!");
      this.classList.toggle('text-danger'); 
  });
});

// Assistir Depois
document.querySelectorAll('.fa-bookmark').forEach(function (bookmarkIcon) {
  bookmarkIcon.addEventListener('click', function () {
      alert("Filme salvo para assistir depois!");
      this.classList.toggle('text-primary'); 
  });
});
