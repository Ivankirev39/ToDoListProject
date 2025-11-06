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

test("Toggle theme button switches between light and dark mode", async t => {
    const body = Selector('body');
    const themeToggle = Selector('#theme-toggle');

    // Initial state: should not have dark-mode class
    await t.expect(body.hasClass('dark-mode')).notOk();

    // Click to enable dark mode
    await t.click(themeToggle);
    await t.expect(body.hasClass('dark-mode')).ok();

    // Click again to disable dark mode
    await t.click(themeToggle);
    await t.expect(body.hasClass('dark-mode')).notOk();
});


test("Progress bar updates as todos are completed", async t => {
    const progressBarFill = Selector('#progress-bar-fill');
    const progressBarLabel = Selector('#progress-bar-label');

    // Add three todos
    await t
        .typeText(Selector("#todo-input"), "Finish unity game")
        .click(Selector(".todo-form button[type='submit']"))
        .typeText(Selector("#todo-input"), "Listen to the new Don Toliver album")
        .click(Selector(".todo-form button[type='submit']"))
        .typeText(Selector("#todo-input"), "Watch the NBA Games tonight")
        .click(Selector(".todo-form button[type='submit']"));

    // Initially, progress should be 0%
    await t.expect(progressBarFill.getStyleProperty('width')).eql('0%');
    await t.expect(progressBarLabel.innerText).eql('0% completed');

    // Complete one todo
    await t.click(Selector(".todo-item").withText("Finish unity game").find("input[type='checkbox']"));
    await t.expect(progressBarLabel.innerText).eql('33% completed');

    // Complete all todos
    await t.click(Selector(".todo-item").withText("Listen to the new Don Toliver album").find("input[type='checkbox']"));
    await t.click(Selector(".todo-item").withText("Watch the NBA Games tonight").find("input[type='checkbox']"));
    await t.expect(progressBarLabel.innerText).eql('100% completed');
});