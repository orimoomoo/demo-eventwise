
// $(document).ready(function () {
//   // Handle create event form submission
//   $('#createEventForm').on('submit', function (e) {
//     e.preventDefault();

//     const name = $('#eventName').val().trim();
//     const description = $('#eventDescription').val().trim();

//     if (!name || !description) {
//       alert('Please fill in both name and description.');
//       return;
//     }

//     const eventData = {
//       name,
//       description,
//       imageUrl: "https://example.com/image.jpg"
//     };

//     createEvent(eventData,
//       function () {
//         alert('Event created successfully!');
//         window.location.href = 'events.html';
//       },
//       function (xhr) {
//         const errorMsg = xhr.responseJSON?.message || 'Failed to create event.';
//         alert(errorMsg);
//       }
//     );
//   });

//   // Render single event item
//   function createEventItem(event) {
//     return `
//       <div class="event-item" data-event-id="${event.id}">
//         <div class="event-info">
//           <div class="event-name">${escapeHtml(event.name)}</div>
//           <div class="event-description">${escapeHtml(event.description)}</div>
//         </div>
//         <div class="event-actions">
//           <button class="btn btn-outline-primary btn-sm action-btn edit-btn"><i class="bi bi-pencil"></i> Edit</button>
//           <button class="btn btn-primary btn-sm action-btn view-btn"><i class="bi bi-eye"></i> View</button>
//           <button class="btn btn-outline-danger btn-sm action-btn delete-btn"><i class="bi bi-trash"></i> Delete</button>
//         </div>
//       </div>
//     `;
//   }

//   function escapeHtml(text) {
//     return $('<div>').text(text).html();
//   }

//   // Render event list in DOM
//   function renderEventList(events) {
//     const container = $('.event-list');
//     container.empty();

//     if (!events || events.length === 0) {
//       container.html('<p>No events found.</p>');
//       return;
//     }

//     events.forEach(event => {
//       container.append(createEventItem(event));
//     });

//     container.append('<div class="end-of-list">End Of List</div>');
//   }

//   // Set up event handlers for buttons
//   function setupEventHandlers() {
//     $('.event-list').on('click', '.edit-btn', function() {
//       const id = $(this).closest('.event-item').data('event-id');
//       alert(`Edit event ${id}`);
//       // Implement edit navigation or modal here
//     });

//     $('.event-list').on('click', '.view-btn', function() {
//       const id = $(this).closest('.event-item').data('event-id');
//       alert(`View event ${id}`);
//       // Implement view navigation or modal here
//     });

//     $('.event-list').on('click', '.delete-btn', function() {
//       const id = $(this).closest('.event-item').data('event-id');
//       if (confirm('Are you sure you want to delete this event?')) {
//         deleteEvent(id,
//           () => {
//             alert('Event deleted');
//             loadEvents();
//           },
//           () => alert('Failed to delete event')
//         );
//       }
//     });
//   }

//   // Load events and render
//   function loadEvents() {
//     fetchEvents(
//       renderEventList,
//       (xhr) => alert('Failed to load events: ' + (xhr.responseJSON?.message || xhr.statusText))
//     );
//   }

//   // Only if event-list container exists, initialize
//   if ($('.event-list').length) {
//     loadEvents();
//     setupEventHandlers();
//   }
// });

function escapeHtml(text) {
  return $('<div>').text(text).html();
}

$(document).ready(function () {

    // Handle create event form submission
    $('#createEventForm').on('submit', function (e) {
        e.preventDefault();

        const name = $('#eventName').val().trim();
        const description = $('#eventDescription').val().trim();
        const date = $('#eventDate').val(); 
        
        if (!name || !description || !date) {
            alert('Please fill in name, description and date.');
            return;
        }

        const eventData = {
            name,
            description,
            imageUrl: "https://example.com/image.jpg", 
            date: date
        };

        createEvent(
        eventData,
        function () {
            Swal.fire({
            icon: 'success',
            title: 'Event Created!',
            text: 'Your event was created successfully.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
            }).then(() => {
            window.location.href = 'events.html';
            });
        },
        function (xhr) {
            const errorMsg = xhr.responseJSON?.message || 'Failed to create event.';

            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMsg,
            confirmButtonText: 'Try Again'
            });
        }
        );
    });

    // Render single event item
    function createEventItem(event) {

      const eventDate = new Date(event.date);

      const weekday = eventDate.toLocaleString('en-US', { weekday: 'long' });  // e.g. "Friday"
      const month = eventDate.toLocaleString('en-US', { month: 'short' });     // e.g. "Oct"
      const day = eventDate.getDate().toString().padStart(2, '0');             // e.g. "31"
      const year = eventDate.getFullYear();                                    // e.g. "2025"

      const formattedDate = `${weekday} ${day} ${month} ${year}`;

      return `
        <div class="event-item mb-3 p-3 border rounded" data-event-id="${event.id}">
          <div class="event-info mb-2">
            <div class="event-name fw-bold text-danger">${escapeHtml(event.name)}</div>
            <div class="event-description text-muted">${escapeHtml(event.description)}</div>
            <div class="event-description text-muted">${escapeHtml(formattedDate)}</div>
          </div>

          <div class="task-list mt-2" data-task-container-for="${event.id}">
            <small class="text-muted">No tasks yet.</small>
          </div>
            <div class="event-actions">
              <button class="btn btn-outline-primary btn-sm action-btn task-btn">
                <i class="bi"></i></i> Add Task
              </button>
              <button class="btn btn-outline-secondary btn-sm action-btn task-view-btn">
              <i class="bi"></i> All Tasks
              </button>
              <button class="btn btn-outline-primary btn-sm action-btn edit-btn">
                <i class="bi bi-pencil"></i> Edit
              </button>
              <button class="btn btn-primary btn-sm action-btn view-btn">
                <i class="bi bi-eye"></i> View
              </button>
              <button class="btn btn-outline-danger btn-sm action-btn delete-btn">
                <i class="bi bi-trash"></i> Delete
              </button>
            </div>


        </div>
      `;
    }

    function escapeHtml(text) {
        return $('<div>').text(text).html();
    }

    // Render event list in DOM
    function renderEventList(events) {
      const container = $('.event-list');
      container.empty();

      if (!events || events.length === 0) {
        container.html('<p>No events found.</p>');
        return;
      }

      events.forEach(event => {
        container.append(createEventItem(event));
        refreshTasksForEvent(event.id);  // consistent task rendering everywhere
      });

      container.append('<div class="end-of-list text-center text-muted mt-3">End Of List</div>');
    }


    // Load events and render
    function loadEvents() {
        fetchEvents(
            renderEventList,
            (xhr) => alert('Failed to load events: ' + (xhr.responseJSON?.message || xhr.statusText))
        );
    }


    // TODO working on Task
    let taskModal;

    // Open modal on Task button click
    $('.event-list').on('click', '.task-btn', function () {
      const eventId = $(this).closest('.event-item').data('event-id');
      $('#taskEventId').val(eventId);
      $('#taskDescription').val('');
      $('#taskCompleted').prop('checked', false);

      const taskModal = new bootstrap.Modal(document.getElementById('taskModal'));
      taskModal.show();
    });

    // Handle task form submission
    $('#taskForm').on('submit', function (e) {
      e.preventDefault();

      const eventId = $('#taskEventId').val();
      const description = $('#taskDescription').val().trim();
      const completed = $('#taskCompleted').is(':checked');

      if (!description) {
        Swal.fire('Description required');
        return;
      }

      const taskData = { description, completed };

      createTask(eventId, taskData,
        () => {
          const taskModal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
          taskModal.hide();

          // Immediately refresh the task container
          refreshTasksForEvent(eventId);

          Swal.fire({
            icon: 'success',
            title: 'Task Created!',
            timer: 1200,
            showConfirmButton: false
          });
        },
        () => Swal.fire('Error', 'Failed to create task', 'error')
      );
    });

    // AJAX call to backend
    function createTask(eventId, taskData, onSuccess, onError) {
      $.ajax({
        url: `http://localhost:8080/api/tasks/${eventId}`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(taskData),
        headers: { Authorization: `Bearer ${getToken()}` },
        success: onSuccess,
        error: onError,
      });
    }
    // TODO end of todo

    // All events

    $('.event-list').on('click', '.task-view-btn', function () {
      const eventId = $(this).closest('.event-item').data('event-id');

      fetchTasksByEvent(eventId,
        function (tasks) {
          let html = `<ul class="list-group text-start">`;
          tasks.forEach(task => {
            html += `
              <li class="list-group-item d-flex justify-content-between align-items-center">
                ${task.description}
                ${task.completed ? '<span class="badge bg-success">✓ Done</span>' : ''}
              </li>`;
          });
          html += `</ul>`;

        Swal.fire({
          title: 'Task List',
          html: html || 'No tasks found.',
          width: 500,
          confirmButtonText: 'Close',
          didOpen: () => {
            $('.task-check').on('change', function () {
              const taskId = $(this).data('task-id');
              const completed = $(this).is(':checked');
              updateTaskCompletion(taskId, completed);
            });
          }
        });
      },
        function () {
          Swal.fire('Error', 'Failed to load tasks', 'error');
        }
      );
    });



    function fetchTasksByEvent(eventId, onSuccess, onError) {
      $.ajax({
        url: `http://localhost:8080/api/tasks/event/${eventId}`,
        method: 'GET',
        headers: {Authorization: `Bearer ${getToken()}`
        },
        success: onSuccess,
        error: onError
      });
    }   
    // TODO end of ALL events

    // TODO update events (includes delete)

    $('.event-list').on('click', '.task-update-btn', function () {
      const eventId = $(this).closest('.event-item').data('event-id');

      fetchTasksByEvent(eventId,
        function (tasks) {
          let html = `<ul class="list-group text-start">`;
          tasks.forEach(task => {
          html += `
            <li class="list-group-item d-flex justify-content-between align-items-center task-item" data-task-id="${task.id}">
              <div class="form-check">
                <input class="form-check-input task-check" type="checkbox" 
                  data-task-id="${task.id}" ${task.completed ? 'checked' : ''}>
                <label class="form-check-label ms-2">
                  ${escapeHtml(task.description)}
                </label>
              </div>
              <button class="btn btn-sm btn-outline-danger task-delete-btn ms-2">
                <i class="bi bi-trash"></i>
              </button>
            </li>`;
        });
        html += `</ul>`;

        Swal.fire({
          title: 'Task List',
          html: html || 'No tasks found.',
          width: 500,
          confirmButtonText: 'Ok',
          didOpen: () => {
            $('.task-check').on('change', function () {
              const taskId = $(this).data('task-id');
              const completed = $(this).is(':checked');
              updateTaskCompletion(taskId, completed);
            });
          }
        });
      },
        function () {
          Swal.fire('Error', 'Failed to load tasks', 'error');
        }
      );
    });

    function fetchTasksByEvent(eventId, onSuccess, onError) {
      $.ajax({
        url: `http://localhost:8080/api/tasks/event/${eventId}`,
        method: 'GET',
        headers: {Authorization: `Bearer ${getToken()}`
        },
        success: onSuccess,
        error: onError
      });
    }   
    // TODO end of update events

    let editModal;  // declare outside so accessible in callbacks

    // Handle Edit button click - open and load event details
    $('.event-list').on('click', '.edit-btn', function () {
        const eventId = $(this).closest('.event-item').data('event-id');

        fetchEventById(eventId,
            function (event) {

                const eventDate = new Date(event.date);

                const day = eventDate.getDate().toString().padStart(2, '0');          // "31"
                const month = (eventDate.getMonth() + 1).toString().padStart(2, '0'); // "10"
                const year = eventDate.getFullYear();                                 // "2025"
            
                const formattedDate = `${year}-${month}-${day}`;

                console.log(event);
                $('#editEventId').val(event.id);
                $('#editEventName').val(event.name);
                $('#editEventDescription').val(event.description);
                $('#editEventImageUrl').val(event.imageUrl || '');
                $('#eventDate').val(formattedDate);

                // Initialize and show modal here
                editModal = new bootstrap.Modal(document.getElementById('editEventModal'));
                editModal.show();
            },
            function () {
                alert('Failed to load event details for editing.');
            }
        );
    });

    // Handle Edit modal form submission
    $('#editEventForm').on('submit', function (e) {
        e.preventDefault();

        const eventId = $('#editEventId').val();
        const updatedEvent = {
            name: $('#editEventName').val().trim(),
            description: $('#editEventDescription').val().trim(),
            imageUrl: $('#editEventImageUrl').val().trim(),
            date: $('#eventDate').val()
        };

        if (!updatedEvent.name || !updatedEvent.description) {
            alert('Name and description are required.');
            return;
        }

        updateEvent(eventId, updatedEvent,
            function () {
                alert('Event updated successfully.');
                editModal.hide();
                loadEvents();
            },
            function () {
                alert('Failed to update event.');
            }
        );
    });

    // Handle View button click - show event details in alert
 $('.event-list').on('click', '.view-btn', function () {
  const eventId = $(this).closest('.event-item').data('event-id');

  fetchEventById(
    eventId,
    function (event) {
      Swal.fire({
        title: 'Event Details',
        html: `
          <div class="text-start">
            <div class="mb-2">
              <label class="form-label fw-bold">Name:</label>
              <div class="form-control">${event.name}</div>
            </div>
            <div class="mb-2">
              <label class="form-label fw-bold">Description:</label>
              <div class="form-control" style="height:auto">${event.description}</div>
            </div>
            <div class="mb-2">
              <label class="form-label fw-bold">Image URL:</label>
              <div class="form-control">${event.imageUrl || 'N/A'}</div>
            </div>
            ${event.imageUrl ? `
              <div class="text-center mt-3">
                <img src="${event.imageUrl}" alt="Event Image" class="img-fluid rounded border" style="max-height: 200px;">
              </div>` : ''}
          </div>
        `,
        width: 600,
        confirmButtonText: 'Close',
        showCloseButton: true,
        customClass: {
          popup: 'border rounded shadow'
        }
      });
    },
    function () {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load event details.'
      });
    }
  );
});

// TODO - Delete Task
// Delete button click handler
$(document).on('click', '.task-delete-btn', function () {
  const $button = $(this); // 👈 store for later use
  const taskId = $button.closest('.task-item').data('task-id');

  Swal.fire({
    title: 'Delete this task?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
  }).then(result => {
    if (result.isConfirmed) {
      deleteTask(taskId,
        () => {
          // Now safely get eventId using the saved reference
          const eventId = $button.closest('[data-task-container-for]').data('task-container-for')
              || $button.closest('.event-item').data('event-id');

          refreshTasksForEvent(eventId); // this keeps it consistent with task creation

          Swal.fire('Deleted!', 'Task has been removed.', 'success');
        },
        () => Swal.fire('Error', 'Failed to delete task.', 'error')
      );
    }
  });
});

// TODO - END of Delete Task



    // Handle Delete button click - confirm and delete event
    $('.event-list').on('click', '.delete-btn', function () {
        const eventId = $(this).closest('.event-item').data('event-id');

        if (confirm('Are you sure you want to delete this event?')) {
            deleteEvent(eventId,
                () => {
                    alert('Event deleted');
                    loadEvents();
                },
                () => alert('Failed to delete event')
            );
        }
    });

    // Initialize if event-list container exists
    if ($('.event-list').length) {
        loadEvents();
    }
});

//  Handle task checkbox toggle (update + refresh)
$(document).on('change', '.task-check', function () {
  const taskId = $(this).data('task-id');
  const completed = $(this).is(':checked');

  updateTaskCompletion(taskId, completed);

  const eventId = $(this).closest('[data-task-container-for]').data('task-container-for')
    || $(this).closest('.event-item').data('event-id');

  if (eventId) {
    // Delay refresh to avoid interfering with checkbox interaction
    setTimeout(() => {
      refreshTasksForEvent(eventId);
    }, 250); // ~250ms is smooth
  }
});

// TODO fresh for delete button
function refreshTasksForEvent(eventId) {
  fetchTasksByEvent(eventId, function (tasks) {
    const taskContainer = $(`[data-task-container-for="${eventId}"]`);
    taskContainer.empty();

    if (!tasks.length) {
      taskContainer.html('<div class="text-muted">No tasks yet.</div>');
    } else {
const taskList = $('<ul class="list-group"></ul>');
tasks.forEach(task => {
  taskList.append(`
    <li class="list-group-item d-flex justify-content-between align-items-center task-item" data-task-id="${task.id}">
      <div class="form-check">
        <input class="form-check-input task-check" type="checkbox"
          data-task-id="${task.id}" ${task.completed ? 'checked' : ''}>
        <label class="form-check-label ms-2">
          ${escapeHtml(task.description)}
        </label>
      </div>
      <div class="d-flex align-items-center">
        ${task.completed ? '<span class="badge bg-success ms-2">✓ Done</span>' : ''}
        <button class="btn btn-sm btn-outline-danger task-delete-btn ms-2">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </li>
  `);
});
taskContainer.append(taskList);
    }
  });
}
