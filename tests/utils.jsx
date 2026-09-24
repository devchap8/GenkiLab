import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";

// Renders `routes` inside a real react-router instance so components using
// useParams/useSearchParams/Link behave as they would in the app, and lets
// tests trigger real navigation (router.navigate, or clicking a Link).
export function renderWithRouter(routes, { initialEntries = ["/"], initialIndex = 0 } = {}) {
    const router = createMemoryRouter(routes, { initialEntries, initialIndex });
    return { ...render(<RouterProvider router={router} />), router };
}
