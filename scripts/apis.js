// api.js

// ---------- Auth API Calls ----------
function register(email, password, onSuccess, onError) {
  $.ajax({
    url: 'http://localhost:8080/api/auth/register',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ email, password }),
    success: onSuccess,
    error: onError
  });
}

function login(email, password, onSuccess, onError) {
  $.ajax({
    url: 'http://localhost:8080/api/auth/login',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ email, password }),
    success: onSuccess,
    error: onError
  });
}

// ---------- Event API Calls ----------
function createEvent(eventData, onSuccess, onError) {
  $.ajax({
    url: 'http://localhost:8080/api/events',
    type: 'POST',
    contentType: 'application/json',
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    data: JSON.stringify(eventData),
    success: onSuccess,
    error: onError
  });
}


// apis.js
function fetchEvents(onSuccess, onError) {
  $.ajax({
    url: 'http://localhost:8080/api/events', // Adjust API URL if needed
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}` // if auth needed
    },
    success: onSuccess,
    error: onError,
  });
}

// Fetch single event by ID
function fetchEventById(eventId, onSuccess, onError) {
  $.ajax({
    url: `http://localhost:8080/api/events/${eventId}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
    success: onSuccess,
    error: onError,
  });
}

// Update event by ID
function updateEvent(eventId, eventData, onSuccess, onError) {
  $.ajax({
    url: `http://localhost:8080/api/events/${eventId}`,
    method: 'PUT',
    contentType: 'application/json',
    headers: { Authorization: `Bearer ${getToken()}` },
    data: JSON.stringify(eventData),
    success: onSuccess,
    error: onError,
  });
}

// Delete event by ID
function deleteEvent(eventId, onSuccess, onError) {
  $.ajax({
    url: `http://localhost:8080/api/events/${eventId}`,
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
    success: onSuccess,
    error: onError,
  });
}

// Createtask()
function createTask(eventId, taskData, onSuccess, onError) {
  $.ajax({
    url: `http://localhost:8080/api/tasks/${eventId}`,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(taskData),
    headers: { Authorization: `Bearer ${getToken()}`},
    success: onSuccess,
    error: onError
  });
}
// End of Createtask()

// TODO fetch all Events
function fetchTasksByEvent(eventId, onSuccess, onError) {
  $.ajax({
    url: `http://localhost:8080/api/tasks/event/${eventId}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}`},
    success: onSuccess,
    error: onError
  });
}

// TODO end of all Events

// TODO tick update

function updateTaskCompletion(taskId, completed) {
  // First fetch the full task object
  $.ajax({
    url: `http://localhost:8080/api/tasks/${taskId}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
    success: function (task) {
      // Modify only the completed status and send full data
      task.completed = completed;

      $.ajax({
        url: `http://localhost:8080/api/tasks/${taskId}`,
        method: 'PUT',
        contentType: 'application/json',
        headers: { Authorization: `Bearer ${getToken()}` },
        data: JSON.stringify(task),
        success: () => console.log('Task updated successfully'),
        error: () => Swal.fire('Error', 'Failed to update task', 'error')
      });
    },
    error: () => Swal.fire('Error', 'Failed to load task', 'error')
  });
}


// TODO end of tick update

// TODO Delete task
function deleteTask(taskId, onSuccess, onError) {
  $.ajax({
    url: `http://localhost:8080/api/tasks/${taskId}`,
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
    success: onSuccess,
    error: onError,
  });
}

// TODO end of Delete task

// ---------- Token Helpers ----------
function saveToken(token) {
  localStorage.setItem('token', token);
}

function getToken() {
  return localStorage.getItem('token');
}

function clearToken() {
  localStorage.removeItem('token');
}
