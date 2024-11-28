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


  document.addEventListener('DOMContentLoaded', function () {
    console.log("Calendario cargado");
  
    var calendarEl = document.getElementById('calendario');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'listWeek', // vista inicial
      timeZone: 'UTC', // zona horaria
      themeSystem: 'bootstrap5', // tema de Bootstrap 5
      weekNumbers: true, // habilitar números de semana
      dayMaxEvents: true, // permitir el enlace "más" cuando hay demasiados eventos
      events: 'https://fullcalendar.io/api/demo-feeds/events.json', // fuente de eventos
      locale: 'es', // Establecer el idioma a español
      
    });
  
    calendar.render();
  });
  
  