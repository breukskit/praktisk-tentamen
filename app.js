class App {
  constructor() {
    this.form = document.getElementById('form');
    this.list = document.getElementById('list');
    this.input = document.getElementById('input');
    this.todos = [];
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.input.value !== '') {
      const todo = new Todo(this.input.value);
      this.todos = [...this.todos, { ...todo }];
      this.render();
      this.input.value = '';
    }
  }
  setListeners() {
    this.form.addEventListener('submit', (e) => {
      this.handleSubmit(e);
    });
  }
  async fetchTodos() {
    const res = await fetch('./tasks.json');
    const data = await res.json();
    this.todos = data;
    this.render();
  }
  toggleTodo(e) {
    const targetId = Number(e.target.parentElement.parentElement.id);
    this.todos.forEach((todo) => {
      if (targetId === todo.id) {
        todo.isCompleted = !todo.isCompleted;
      }
    });
    this.render();
  }
  removeTodo(e) {
    const targetId = Number(e.target.parentElement.parentElement.id);
    this.todos.forEach((todo, i) => {
      if (todo.id === targetId) {
        this.todos.splice(i, 1);
      }
    });
    this.render();
  }
  render() {
    this.list.innerHTML = '';
    this.todos.forEach((todo) => {
      const li = document.createElement('li');
      li.classList.add('d-flex', 'justify-content-between', 'p-1');
      li.id = todo.id;

      const div = document.createElement('div');
      div.classList.add('d-flex', 'flex-grow-1');

      const todoCheck = document.createElement('span');
      todo.isCompleted
        ? todoCheck.classList.add('me-2', 'check')
        : todoCheck.classList.add('me-2', 'check', 'unfinished');

      const checkIcon = document.createElement('i');
      checkIcon.classList.add('far', 'fa-check-circle');

      const todoItem = document.createElement('p');
      todoItem.textContent = todo.title;
      todo.isCompleted
        ? todoItem.classList.add(
            'text-decoration-line-through',
            'todo-item',
            'flex-grow-1'
          )
        : todoItem.classList.add('todo-item', 'flex-grow-1');

      todoItem.addEventListener('click', (e) => {
        this.toggleTodo(e);
      });

      const todoTrash = document.createElement('span');
      todoTrash.classList.add(
        'trash',
        'px-2',
        'd-flex',
        'justify-content-center',
        'align-items-center'
      );
      todoTrash.addEventListener('click', (e) => {
        this.removeTodo(e);
      });

      const trashIcon = document.createElement('i');
      trashIcon.classList.add('far', 'fa-trash-alt');

      todoCheck.appendChild(checkIcon);
      todoTrash.appendChild(trashIcon);

      div.appendChild(todoCheck);
      div.appendChild(todoItem);

      li.appendChild(div);
      li.appendChild(todoTrash);

      this.list.appendChild(li);
    });
  }
}

class Todo {
  constructor(title) {
    this.title = title;
    this.completed = false;
    this.id = Math.random();
  }
}

const app = new App();

window.addEventListener('DOMContentLoaded', () => {
  app.setListeners();
  app.fetchTodos();
});
