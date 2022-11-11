/* eslint-disable no-unused-vars */
const { connect } = require("./connectDB");
const Todo = require("./TodoModel");

const addTodo = async () => {
  try {
    await connect();
    const todo = await Todo.addTask({
      title: "Task 2",
      dueDate: new Date(),
      completed: false,
    });

    console.log(`Todo created with ID : ${todo.id}`);
  } catch (error) {
    console.log(error);
  }
};

const todoCount = async () => {
  try {
    const count = await Todo.count();
    console.log(`Number of todos in Table : ${count}`);
  } catch (error) {
    console.log(error);
  }
};

const allTodos = async () => {
  try {
    const todos = await Todo.findAll({
      order: [["id", "DESC"]],
    });

    var str = (await todos).map((todo) => todo.displayTodo()).join("\n");
    console.log(str);
  } catch (error) {
    console.log(error);
  }
};

const singleTodo = async () => {
  try {
    const todo = await Todo.findOne({
      where: {
        completed: false,
      },
      order: [["id", "DESC"]],
    });

    console.log(todo.displayTodo());
  } catch (error) {
    console.log(error);
  }
};

const updateTodo = async (id) => {
  try {
    const todo = await Todo.update(
      { completed: true },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async (id) => {
  try {
    const afftectedRows = await Todo.destroy({
      where: {
        id: id,
      },
    });

    console.log(`Number of rows deleted : ${afftectedRows}`);
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  // await addTodo();
  // await todoCount();
  // await allTodos();
  // await singleTodo()
  // await updateTodo(2);
  await allTodos();
  // await deleteTodo(2);
  await allTodos();
})();
