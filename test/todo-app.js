import { Selector } from 'testcafe';

fixture("Todo tests")
    .page("https://ivankirev.dk/test/todo/");

test("Add a new todo item", async t => {
    await t
        .typeText(Selector("#todo-input"), "Clean your room")
        .click(Selector("#submit"))
        .expect(Selector(".todo-item").withText("Clean your room").exists).ok();
});

test("Remove a todo item", async t => {
    await t
        .typeText(Selector("#todo-input"), "Clean your room")
        .click(Selector("#submit"))
        .click(Selector(".todo-item").withText("Clean your room").find("button"))
        .expect(Selector(".todo-item").withText("Clean your room").exists).notOk();
});