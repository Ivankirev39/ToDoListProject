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