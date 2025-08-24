/// <reference types="vitest" />
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";

function renderWithRouter(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("Routing", () => {
  it("renders Home at /", () => {
    renderWithRouter(["/"]);
    expect(screen.getByRole("heading", { name: /home/i })).toBeInTheDocument();
  });

  it("navigates to a dynamic blog post", () => {
    renderWithRouter(["/blog/2"]);
    expect(screen.getByRole("heading", { name: /nested routes 101/i })).toBeInTheDocument();
  });

  it("blocks /profile when logged out and redirects to /login", () => {
    window.localStorage.setItem("demo_isAuthed", "false");
    renderWithRouter(["/profile"]);
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  });

  it("shows nested route content inside profile when logged in", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem("demo_isAuthed", "false");
    renderWithRouter(["/profile"]);

    // Log in
    await user.click(screen.getByRole("button", { name: /log in/i }));
    // After login, should land on /profile (index renders ProfileDetails)
    expect(await screen.findByRole("heading", { name: /profile details/i })).toBeInTheDocument();

    // Navigate to Settings (nested)
    await user.click(screen.getByRole("link", { name: /settings/i }));
    expect(await screen.findByRole("heading", { name: /profile settings/i })).toBeInTheDocument();
  });

  it("renders 404 for unknown routes", () => {
    renderWithRouter(["/does-not-exist"]);
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
  });
});
