import { Selector } from 'testcafe';

fixture("ToDo App Tests")
    .page("https://todo.ivankirev.dk/test/");

test("Add a new todo item", async t => {
    await t
        // Arrange + Act
        .typeText(Selector("#todo-input"), "Clean your room")
        .click(Selector(".todo-form button[type='submit']"))
        .typeText(Selector("#todo-input"), "Wash the dishes")
        .click(Selector(".todo-form button[type='submit']"))
        // Assert
        .expect(Selector("#todo-list").childElementCount).eql(2);
});


test("Remove a todo item", async t => {
    await t
        // Arrange + Act
        .typeText(Selector("#todo-input"), "Clean your room")
        .click(Selector(".todo-form button[type='submit']"))
        .typeText(Selector("#todo-input"), "Wash the dishes")
        .click(Selector(".todo-form button[type='submit']"))
        // Remove one item
        .click(Selector(".todo-item").withText("Clean your room").find("button"))
        // Assert
        .expect(Selector("#todo-list").childElementCount).eql(1)
        .expect(Selector(".todo-item").withText("Clean your room").exists).notOk();
});


test("Toggle all todos as completed", async t => {
    // Add three todos
    await t
        .typeText(Selector("#todo-input"), "Buy groceries")
        .click(Selector(".todo-form button[type='submit']"))
        .typeText(Selector("#todo-input"), "Cook dinner")
        .click(Selector(".todo-form button[type='submit']"))
        .typeText(Selector("#todo-input"), "Call my grandfather")
        .click(Selector(".todo-form button[type='submit']"));

    // Toggle all
    await t
        .click(Selector("#toggle-all"));

    // Assert all checkboxes are checked
    const todoItems = Selector(".todo-item");
    const count = await todoItems.count;
    for (let i = 0; i < count; i++) {
        await t.expect(todoItems.nth(i).find("input[type='checkbox']").checked).ok();
    }
});


test("Clear completed todos removes all toggled items", async t => {
    // Add three todos
    await t
        .typeText(Selector("#todo-input"), "Buy groceries")
        .click(Selector(".todo-form button[type='submit']"))
        .typeText(Selector("#todo-input"), "Cook dinner")
        .click(Selector(".todo-form button[type='submit']"))
        .typeText(Selector("#todo-input"), "Call my grandfather")
        .click(Selector(".todo-form button[type='submit']"));

    // Toggle all
    await t
        .click(Selector("#toggle-all"));

    // Clear completed
    await t
        .click(Selector("#clear-completed"));

    // Assert that the todo list is empty
    await t.expect(Selector("#todo-list").childElementCount).eql(0);
});
