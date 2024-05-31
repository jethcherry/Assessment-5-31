// Define interface for todo items
interface ToDo {
    id: number;
    title: string;
    completed: boolean;
}

// Class to create the todoList
class ToDoList {
    private static instance: ToDoList;
    private baseUrl: string = "http://localhost:3000/todos";

    private constructor() {}

    static getInstance(): ToDoList {
        if (!ToDoList.instance) {
            ToDoList.instance = new ToDoList();
        }
        return ToDoList.instance;
    }


    async createAsync(title: string): Promise<void> {
        const newTodo: Omit<ToDo, 'id'> = {
            title,
            completed: false
        };

        await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        });
    }


    async fetchTodoList(): Promise<ToDo[]> {
        const response = await fetch(this.baseUrl);
        return response.json();
    }
    //logic to update the to do list items

    async updateTodoList(todo: ToDo): Promise<void> {
        await fetch(`${this.baseUrl}/${todo.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        });
    }

    //logic to delete the items
     async deleteTodoList(id: number): Promise<void> {
        await fetch(`${this.baseUrl}/${id}`, {
            method: "DELETE",
        });
    }
}

class RenderTodos {
    static async render(todos: ToDo[]): Promise<void> {
        const toDolistContainer = document.getElementById("list");
        if (!toDolistContainer) return;

        toDolistContainer.innerHTML = "";

        // render to do list elements
        todos.forEach(todo => {
            const listItem = document.createElement('li');
            listItem.className = 'item';

            listItem.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <label class="${todo.completed ? 'completed' : ''}">${todo.title}</label>
                <button>Delete</button>
            `;

            const checkbox = listItem.querySelector('input[type="checkbox"]') as HTMLInputElement;
            const deleteBtn = listItem.querySelector('button');

            if (deleteBtn) {
                checkbox.addEventListener('change', async () => {
                    todo.completed = checkbox.checked;
                    await ToDoList.getInstance().updateTodoList(todo);
                    RenderTodos.render(await ToDoList.getInstance().fetchTodoList());
                });

                deleteBtn.addEventListener('click', async () => {
                    await ToDoList.getInstance().deleteTodoList(todo.id);
                    RenderTodos.render(await ToDoList.getInstance().fetchTodoList());
                });
            }

            toDolistContainer.appendChild(listItem);
        });
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const toDoList = ToDoList.getInstance();
    const form = document.getElementById('form') as HTMLFormElement;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const input = document.getElementById('input') as HTMLInputElement;
        const title = input.value.trim();
        if (title) {
            await toDoList.createAsync(title);
            input.value = '';
            RenderTodos.render(await toDoList.fetchTodoList());
        }
    });

    RenderTodos.render(await toDoList.fetchTodoList());
});
