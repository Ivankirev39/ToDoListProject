import './style.css'
// import { setupCounter } from './counter.ts'

interface Todo {
  id: number
  text: string
  completed: boolean
}

let todos: Todo[] = [];

const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.querySelector('.todo-list') as HTMLUListElement;
const errorMessage = document.getElementById('error-message') as HTMLDivElement;
const clearCompletedBtn = document.getElementById('clear-completed') as HTMLButtonElement;
const toggleAllBtn = document.getElementById('toggle-all') as HTMLButtonElement;



clearCompletedBtn?.addEventListener('click', () => {
  clearCompletedTodos();
});

toggleAllBtn?.addEventListener('click', () => {
  toggleAllTodos();
});



const addTodo = (text:string) => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false
}
todos.push(newTodo);
console.log("check to see if push works:", todos);
renderTodos()
}


todoForm.addEventListener('submit', (event:Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  if (text !== '') {
    addTodo(text);
    todoInput.value = '';
    errorMessage.style.display = 'none'; // Hide error on success
    todoInput.classList.remove('input-error');
  } else {
    errorMessage.style.display = 'block'; // Show error
    todoInput.classList.add('input-error');
  }
})

const renderTodos = () => {
  todoList.innerHTML = '';
  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
      <input type="checkbox" class="toggle-completed" ${todo.completed ? 'checked' : ''} />
      <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.text}</span>
      <button>Remove</button>
    `;

    // Checkbox event
    const checkbox = li.querySelector('.toggle-completed') as HTMLInputElement;
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      renderTodos();
    });

    addRemoveButtonListener(li, todo.id);
    todoList.appendChild(li);
  })
}
renderTodos()

const addRemoveButtonListener = (li: HTMLLIElement, id:number) => {
  const removeButton = li.querySelector('button') as HTMLButtonElement;
  removeButton?.addEventListener('click', () => {
    removeTodo(id)
  });
} 

const removeTodo = (id: number) => {
  todos = todos.filter(todo => todo.id !== id)
  renderTodos()
}

const clearCompletedTodos = () => {
  todos = todos.filter(todo => !todo.completed);
  renderTodos();
};

const toggleAllTodos = () => {
  const allCompleted = todos.every(todo => todo.completed);
  todos = todos.map(todo => ({ ...todo, completed: !allCompleted }));
  renderTodos();
};