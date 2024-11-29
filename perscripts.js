document.addEventListener('DOMContentLoaded', function () {
  console.log("Calendario cargado");

  // Seleccionar el contenedor del calendario
  var calendarEl = document.getElementById('calendar');

  // Inicializar el calendario
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'listWeek', // Cambiado a una vista de mes para una mejor visualización de las tareas
    timeZone: 'UTC', // Zona horaria
    themeSystem: 'bootstrap5', // Tema Bootstrap 5
    weekNumbers: true, // Mostrar números de la semana
    dayMaxEvents: true, // Mostrar un enlace "más" si hay demasiados eventos en un día
    locale: 'es', // Idioma español
  });

  // Renderizar el calendario
  calendar.render();

  const assignButton = document.getElementById('assign-task-button');
  const assignForm = document.getElementById('assign-task-form');
  const cancelAssign = document.getElementById('cancel-assign');
  const activitiesColumn = document.getElementById('activities-column');

  // Mostrar el formulario de asignación
  assignButton.addEventListener('click', () => {
    assignForm.classList.remove('d-none');
    assignButton.classList.add('d-none');
  });

  // Cancelar asignación
  cancelAssign.addEventListener('click', () => {
    assignForm.classList.add('d-none');
    assignButton.classList.remove('d-none');
  });

  // Asignar tarea
  assignForm.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const taskTitle = document.getElementById('task-title').value;
    const taskDetails = document.getElementById('task-details').value;
    const assignee = document.getElementById('assignee').value;
    const dueDate = document.getElementById('due-date').value;  // Fecha de vencimiento

    // Generar un ID único para la tarea
    const taskId = 'task-' + new Date().getTime(); // Usar el tiempo actual como identificador único

    // Crear la nueva tarea
    const taskCard = document.createElement('article');
    taskCard.className = 'task-card';
    taskCard.innerHTML = `
      <h2 class="task-title">${taskTitle}</h2>
      <p class="task-status">Estado: Pendiente</p>
      <p><strong>Asignado a:</strong> ${assignee}</p>
      <p><strong>Vencimiento:</strong> ${dueDate}</p>
      <button class="btn btn-sm btn-primary mt-2 mark-completed">Marcar como completado</button>
      <button class="btn btn-sm btn-secondary mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#details-${taskId}" aria-expanded="false" aria-controls="details-${taskId}">
        Más detalles
      </button>
      <div class="collapse mt-2" id="details-${taskId}">
        <div class="card card-body">
          ${taskDetails}
        </div>
      </div>
      <!-- Colapso para el formulario de completar tarea -->
      <div class="collapse mt-2" id="complete-form-${taskId}">
        <div class="card card-body">
          <form class="completion-form mt-3">
            <div class="mb-3">
              <label for="fechareali-${taskId}" class="form-label">Fecha de finalización:</label>
              <input type="date" id="fechareali-${taskId}" class="form-control" required>
            </div>
            <div class="input-group mb-3">
              <input type="file" class="form-control" id="inputGroupFile01-${taskId}">
            </div>
            <div class="mb-3">
              <label for="observaciones1-${taskId}" class="form-label">Descripción y Observaciones del proceso:</label>
              <textarea id="observaciones1-${taskId}" class="form-control" rows="3" required></textarea>
            </div>
            <button type="submit" class="btn btn-success">Confirmar finalización</button>
          </form>
        </div>
      </div>
    `;

    // Agregar tarea al calendario (asegurándonos que la fecha esté en formato correcto)
    calendar.addEvent({
      title: taskTitle,
      start: dueDate, // Fecha de vencimiento de la tarea
      allDay: true, // Especifica que es un evento de todo el día
    });

    // Manejo de la tarea (igual al código anterior)
    const markCompletedButton = taskCard.querySelector('.mark-completed');
    const completeFormCollapse = taskCard.querySelector('.collapse#complete-form-' + taskId);

    // Mostrar/ocultar formulario de completado
    markCompletedButton.addEventListener('click', function () {
      // Ocultar el botón de "Marcar como completado"
      this.classList.add('d-none');
      // Mostrar el formulario de completar tarea usando collapse
      const collapse = new bootstrap.Collapse(completeFormCollapse, {
        toggle: true
      });
    });

    const completionForm = taskCard.querySelector('.completion-form');
    completionForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Cambiar el estado y color de la tarea
      taskCard.classList.add('completed');
      taskCard.querySelector('.task-status').textContent = 'Estado: Completado';
      taskCard.style.borderLeftColor = '#198754'; // Color verde para completada
      taskCard.style.backgroundColor = '#e9f7ec'; // Fondo verde claro

      // Eliminar el formulario de finalización con collapse
      const collapse = new bootstrap.Collapse(completeFormCollapse, {
        toggle: false
      });
      collapse.hide();  // Cerrar el formulario colapsado
      completionForm.remove();  // Eliminar el formulario de la tarea
    });

    // Agregar la tarjeta de tarea a la columna de actividades
    activitiesColumn.appendChild(taskCard);

    // Restablecer el formulario de asignación y ocultarlo
    assignForm.classList.add('d-none');
    assignButton.classList.remove('d-none');
    assignForm.querySelector('form').reset();
  });
});
