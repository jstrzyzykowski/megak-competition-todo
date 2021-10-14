// DOM Elements
const todoList = document.getElementById('todo-list');
const todoCount = document.getElementById('todo-count');
const form = document.getElementById('create-todo-form');
const input = document.getElementById('input-title');
const loader = document.getElementById('loader');

// Variables
let state = {};

// Functions
function createAndAddTodoElement(delayMs, {id, title: todoTitle, completed}) {
  const listItem = document.createElement('li');
  listItem.className = `app__body-listContainer-list-item ${completed ? 'completed' : ''}`;
  listItem.dataset.key = id;
  listItem.style.animationDelay = `${delayMs}s`;

  const completeStatus = document.createElement('div');
  completeStatus.className = 'app__body-listContainer-list-item-completeStatus';
  if(completed) completeStatus.innerHTML = '<i class="fas fa-check"></i>';

  const contentContainer = document.createElement('div');
  contentContainer.className = 'app__body-listContainer-list-item-contentContainer';

  // EDIT FORM
  const editForm = document.createElement('form');
  editForm.className = 'app__body-listContainer-list-item-editForm';
  editForm.style.display = 'none';
  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    loader.style.display = 'flex';
    fetch(`/api/todo/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title: editInputText.value, completed }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()).then((data) => {
      state = data;
      renderView();
    }).catch((error) => console.log(error.message));
  });


  const editInputText = document.createElement('input');
  editInputText.className = 'app__body-listContainer-list-item-editForm-inputText';
  editInputText.type = 'text';
  editInputText.setAttribute('type', 'text');
  editInputText.setAttribute('required', 'true');
  editInputText.setAttribute('minlength', '5');
  editInputText.setAttribute('maxlength', '50');

  const editButtonsContainer = document.createElement('div')
  editButtonsContainer.className = 'app__body-listContainer-list-item-editForm-editButtonsContainer';

  const editConfirmBtn = document.createElement('button');
  editConfirmBtn.className = 'app__body-listContainer-list-item-editForm-editButtonsContainer-button';
  editConfirmBtn.setAttribute('type', 'submit');
  editConfirmBtn.innerHTML = '<i class="fas fa-check"></i>';

  const editRejectBtn = document.createElement('button');
  editRejectBtn.className = 'app__body-listContainer-list-item-editForm-editButtonsContainer-button';
  editRejectBtn.setAttribute('type', 'button');
  editRejectBtn.innerHTML = '<i class="fas fa-times"></i>';
  editRejectBtn.addEventListener('click', () => {
    editForm.style.display = 'none';
    contentContainer.style.display = 'flex';
  })

  editForm.appendChild(editInputText);
  editButtonsContainer.appendChild(editConfirmBtn);
  editButtonsContainer.appendChild(editRejectBtn);
  editForm.appendChild(editButtonsContainer);

  // EDIT FORM END

  const title = document.createElement('p');
  title.className = 'app__body-listContainer-list-item-contentContainer-title';
  title.innerText = todoTitle;

  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'app__body-listContainer-list-item-contentContainer-buttonsContainer';

  const completeBtn = document.createElement('button');
  completeBtn.className = 'app__body-listContainer-list-item-contentContainer-buttonsContainer-button';
  if(!completed) completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  else completeBtn.innerHTML = '<i class="fas fa-times"></i>';
  completeBtn.addEventListener('click', () => {
    loader.style.display = 'flex';
    fetch(`/api/todo/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title: todoTitle, completed: !completed }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((data) => {
      state = data;
      renderView();
    }).catch((error) => console.log(error.message));
  });

  const editButton = document.createElement('button');
  editButton.className = `app__body-listContainer-list-item-contentContainer-buttonsContainer-button ${completed ? 'disable': ''}`;
  editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
  editButton.disabled = completed;
  editButton.addEventListener('click', () => {
    contentContainer.style.display = 'none';
    editForm.style.display = 'flex';
    editInputText.value = todoTitle;
  })

  const removeBtn = document.createElement('button');
  removeBtn.className = 'app__body-listContainer-list-item-contentContainer-buttonsContainer-button';
  removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
  removeBtn.addEventListener('click', () => {
    loader.style.display = 'flex';
    fetch(`/api/todo/${id}`, {
      method: "DELETE",
    }).then((response) => response.json()).then((data) => {
      state = data;
      renderView();
    }).catch((error) => console.log(error.message));
  })

  listItem.appendChild(completeStatus);
  contentContainer.appendChild(title);
  buttonsContainer.appendChild(completeBtn);
  buttonsContainer.appendChild(editButton);
  buttonsContainer.appendChild(removeBtn);
  contentContainer.appendChild(buttonsContainer);
  listItem.appendChild(contentContainer);
  listItem.appendChild(editForm);
  todoList.appendChild(listItem);
}

// Listeners
window.addEventListener('load', () => {
  loader.style.display = 'flex';
  fetch('/api/todos')
    .then((response) => response.json())
    .then((data) => {
    state = data;
    renderView();
  })
    .catch((error) => console.log(error.message));
})

form.addEventListener('submit', (event) => {
  event.preventDefault();
  loader.style.display = 'flex';
  fetch('/api/todo/create', {
    method: 'POST',
    body: JSON.stringify({title: input.value}),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      state = data;
      renderView();
      input.value = '';
    }).catch((error) => console.log(error.message));
})

function renderView() {
  todoList.innerHTML = '';
  let notCompletedCount = 0;
  let delayMs = 0;
  for (const [key, value] of Object.entries(state)) {
    const {title, completed} = value;
    if(!completed) notCompletedCount += 1;
    createAndAddTodoElement(delayMs,{id: key, title, completed});
    delayMs += 0.1;
  }
  todoCount.innerText = notCompletedCount;
  loader.style.display = 'none';
}