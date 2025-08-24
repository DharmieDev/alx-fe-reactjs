import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoApp Component", () => {
  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
    expect(screen.getByText("Walk the dog")).toBeInTheDocument();
    expect(screen.getByText("Read a book")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/add a new todo/i);
    const button = screen.getByText(/add/i);

    // simulate typing
    fireEvent.change(input, { target: { value: "Learn testing" } });
    fireEvent.click(button);

    expect(screen.getByText("Learn testing")).toBeInTheDocument();
  });

  test("toggles a todo", () => {
    render(<TodoList />);
    const todoItem = screen.getByText("Buy groceries");

    // should not be completed initially
    expect(todoItem).not.toHaveStyle("text-decoration: line-through");

    // click to toggle
    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle("text-decoration: line-through");

    // click again to untoggle
    fireEvent.click(todoItem);
    expect(todoItem).not.toHaveStyle("text-decoration: line-through");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    const todoItem = screen.getByText("Walk the dog");
    const deleteButton = screen.getByLabelText("Delete Walk the dog");

    fireEvent.click(deleteButton);

    expect(todoItem).not.toBeInTheDocument();
  });
});
