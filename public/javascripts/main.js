// DOM Elements
const todoList = document.getElementById('todo-list');
const todoCount = document.getElementById('todo-count');

// Variables
let state = [];

// Functions
function createAndAddTodoElement({id, title: todoTitle, completed}) {
  console.log(id, todoTitle, completed);
  const listItem = document.createElement('li');
  listItem.className = `app__body-listContainer-list-item ${completed ? 'completed' : ''}`;
  listItem.dataset.key = id;

  const completeStatus = document.createElement('div');
  completeStatus.className = 'app__body-listContainer-list-item-completeStatus';
  if(completed) completeStatus.innerHTML = '<i class="fas fa-check"></i>';

  const contentContainer = document.createElement('div');
  contentContainer.className = 'app__body-listContainer-list-item-contentContainer';

  const title = document.createElement('p');
  title.className = 'app__body-listContainer-list-item-contentContainer-title';
  title.innerText = todoTitle;

  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'app__body-listContainer-list-item-contentContainer-buttonsContainer';

  const completeBtn = document.createElement('button');
  completeBtn.className = 'app__body-listContainer-list-item-contentContainer-buttonsContainer-button';
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';

  const editButton = document.createElement('button');
  editButton.className = `app__body-listContainer-list-item-contentContainer-buttonsContainer-button ${completed ? 'disable': ''}`;
  editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
  editButton.disabled = completed;

  const removeBtn = document.createElement('button');
  removeBtn.className = 'app__body-listContainer-list-item-contentContainer-buttonsContainer-button';
  removeBtn.innerHTML = '<i class="fas fa-trash"></i>';

  listItem.appendChild(completeStatus);
  contentContainer.appendChild(title);
  buttonsContainer.appendChild(completeBtn);
  buttonsContainer.appendChild(editButton);
  buttonsContainer.appendChild(removeBtn);
  contentContainer.appendChild(buttonsContainer)
  listItem.appendChild(contentContainer);
  todoList.appendChild(listItem);
}

// Listeners
window.addEventListener('load', () => {
  fetch('/api/todos').then((response) => response.json()).then((data) => {
    state = data;
    todoCount.innerText = state.length;
    for (const todo of state) createAndAddTodoElement(todo);
  });



})