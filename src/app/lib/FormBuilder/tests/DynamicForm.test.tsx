import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DynamicForm from "../components/DynamicForm";

jest.mock("../adapters/storageAdapter");

const formSchema = {
  title: "Test Form",
  fields: [
    { name: "username", label: "Username", type: "text", required: true },
    { name: "avatar", label: "Avatar", type: "file", storage: "s3" },
    {
      name: "addresses",
      label: "Addresses",
      type: "subtable",
      fields: [
        { name: "street", label: "Street", type: "text" },
        { name: "city", label: "City", type: "text" }
      ]
    }
  ]
};

describe("DynamicForm", () => {
  test("renders fields", () => {
    render(<DynamicForm schema={formSchema} onSubmit={jest.fn()} />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Avatar")).toBeInTheDocument();
    expect(screen.getByText("Add Row")).toBeInTheDocument();
  });

  test("subtable add/remove row", async () => {
    render(<DynamicForm schema={formSchema} onSubmit={jest.fn()} />);
    const addButton = screen.getByText("Add Row");
    fireEvent.click(addButton);
    expect(screen.getAllByLabelText("Street").length).toBe(1);
    fireEvent.click(screen.getByText("Remove"));
    expect(screen.queryByLabelText("Street")).toBeNull();
  });

  test("validation errors are shown", async () => {
    const handleSubmit = jest.fn();
    render(<DynamicForm schema={formSchema} onSubmit={handleSubmit} />);
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => expect(screen.getByText("Required")).toBeInTheDocument());
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test("form submits valid data", async () => {
    const handleSubmit = jest.fn();
    render(<DynamicForm schema={formSchema} onSubmit={handleSubmit} />);
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "John" } });
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith(expect.objectContaining({ username: "John" })));
  });
});
