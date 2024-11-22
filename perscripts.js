// scripts.js
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
      const taskCard = this.closest('.task-card');
      taskCard.classList.add('completed');
      taskCard.querySelector('.task-status').textContent = 'Estado: Completado';
      taskCard.style.borderLeftColor = '#198754';
      taskCard.style.backgroundColor = '#e9f7ec';
      this.remove();
    });
  });
  