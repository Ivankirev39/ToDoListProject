import { describe, it, expect } from 'vitest';

interface Todo {
  id: number
  text: string
  completed: boolean
}

const addTodo = (todos: Todo[], text:string) => {
    const newTodo: Todo = {
        id: 123,
        text,
        completed: false
    }
    return [...todos, newTodo];
}

const removeTodo = (todos: Todo[], id: number) => {
    return todos.filter(todo => todo.id !== id);
}

describe('addTodo', () => {
    it('should add a new todo', () => {
        const todos: Todo[] = [];
        const result = addTodo(todos, 'Test todo');
        expect(result.length).toBe(1);
        expect(result[0].text).toBe('Test todo');
        expect(result[0].completed).toBe(false);
    })
})

describe('removeTodo', () => {
    it('should remove a todo by id', () => {
        const todos: Todo[] = [{
            id: 123,
            text: 'Test todo',
            completed: false
        },
        {
            id: 456,
            text: 'Another todo',
            completed: false
        }
    ]
        const result = removeTodo(todos, 123);
        expect(result.length).toBe(1);
        expect(result[0].id).toBe(456);
    })
    it('should do nothing it the id is not found', () => {
         const todos: Todo[] = [{
            id: 123,
            text: 'Test todo',
            completed: false
        },
        {
            id: 456,
            text: 'Another todo',
            completed: false
        }
    ]
    const result = removeTodo(todos, 999);
    expect(result.length).toBe(2);
    expect(result[0].id).toBe(123);
    })
})


const toggleAllTodos = (todos: Todo[]) => {
    const allCompleted = todos.every(todo => todo.completed);
    return todos.map(todo => ({ ...todo, completed: !allCompleted }));
};

describe('toggleAllTodos', () => {
    it('should mark all todos as completed if not all are completed', () => {
        const todos: Todo[] = [
            { id: 1, text: 'A', completed: false },
            { id: 2, text: 'B', completed: false }
        ];
        const result = toggleAllTodos(todos);
        expect(result.every(todo => todo.completed)).toBe(true);
    });

    it('should mark all todos as not completed if all are completed', () => {
        const todos: Todo[] = [
            { id: 1, text: 'A', completed: true },
            { id: 2, text: 'B', completed: true }
        ];
        const result = toggleAllTodos(todos);
        expect(result.every(todo => !todo.completed)).toBe(true);
    });
});


const clearCompletedTodos = (todos: Todo[]) => {
    return todos.filter(todo => !todo.completed);
};

describe('clearCompletedTodos', () => {
    it('should remove all completed todos', () => {
        const todos: Todo[] = [
            { id: 1, text: 'A', completed: true },
            { id: 2, text: 'B', completed: false },
            { id: 3, text: 'C', completed: true }
        ];
        const result = clearCompletedTodos(todos);
        expect(result.length).toBe(1);
        expect(result[0].id).toBe(2);
        expect(result[0].completed).toBe(false);
    });

    it('should do nothing if no todos are completed', () => {
        const todos: Todo[] = [
            { id: 1, text: 'A', completed: false },
            { id: 2, text: 'B', completed: false }
        ];
        const result = clearCompletedTodos(todos);
        expect(result.length).toBe(2);
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);
    });

    it('should return empty array if all todos are completed', () => {
        const todos: Todo[] = [
            { id: 1, text: 'A', completed: true },
            { id: 2, text: 'B', completed: true }
        ];
        const result = clearCompletedTodos(todos);
        expect(result.length).toBe(0);
    });
});

describe('theme toggle button', () => {
    it('should toggle dark-mode class on body', () => {
        // Setup DOM
        document.body.innerHTML = `
            <button id="theme-toggle">🌙 Toggle Theme</button>
        `;
        const themeToggleBtn = document.getElementById('theme-toggle') as HTMLButtonElement;

        // Simulate click
        themeToggleBtn.click();
        expect(document.body.classList.contains('dark-mode')).toBe(true);

        // Simulate another click
        themeToggleBtn.click();
        expect(document.body.classList.contains('dark-mode')).toBe(false);
    });
});

const getProgressPercent = (todos: Todo[]) => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
};

describe('getProgressPercent', () => {
    it('should return 0% when there are no todos', () => {
        expect(getProgressPercent([])).toBe(0);
    });

    it('should return 0% when none are completed', () => {
        const todos: Todo[] = [
            { id: 1, text: 'A', completed: false },
            { id: 2, text: 'B', completed: false }
        ];
        expect(getProgressPercent(todos)).toBe(0);
    });

    it('should return correct percent when some are completed', () => {
        const todos: Todo[] = [
            { id: 1, text: 'A', completed: true },
            { id: 2, text: 'B', completed: false },
            { id: 3, text: 'C', completed: false }
        ];
        expect(getProgressPercent(todos)).toBe(33);
    });

    it('should return 100% when all are completed', () => {
        const todos: Todo[] = [
            { id: 1, text: 'A', completed: true },
            { id: 2, text: 'B', completed: true }
        ];
        expect(getProgressPercent(todos)).toBe(100);
    });
});