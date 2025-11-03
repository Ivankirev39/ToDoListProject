import { Selector } from 'testcafe';

fixture("ToDo App Tests")
    .page("https://ivankirev.dk/test/todo/");

test("Add a new todo item", async t => {
    const input = Selector("#todo-input");
    await t
        .expect(input.exists).ok({ timeout: 5000 }) // Wait up to 5s for input
        .typeText(input, "Clean your room")
        .click(Selector(".todo-form button[type='submit']"))
        .typeText(input, "Wash the dishes")
        .click(Selector(".todo-form button[type='submit']"))
        .expect(Selector("#todo-list").childElementCount).eql(2);
});

test("Remove a todo item", async t => {
    const input = Selector("#todo-input");
    await t
        .expect(input.exists).ok({ timeout: 5000 }) // Wait up to 5s for input
        // Arrange + Act
        .typeText(input, "Clean your room")
        .click(Selector(".todo-form button[type='submit']"))
        .typeText(input, "Wash the dishes")
        .click(Selector(".todo-form button[type='submit']"))
        // Remove one item
        .click(Selector(".todo-item").withText("Clean your room").find("button"))
        // Assert
        .expect(Selector("#todo-list").childElementCount).eql(1)
        .expect(Selector(".todo-item").withText("Clean your room").exists).notOk();
});