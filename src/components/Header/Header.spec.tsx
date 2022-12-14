import { render, screen } from "@testing-library/react";
import { Header } from ".";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: "/",
    };
  },
}));

jest.mock("next-auth/react", () => ({
  useSession: () => ({
    status: "unauthenticated",
    data: null,
  }),
}));

describe("Header component", () => {
  it("renders correctly", () => {
    render(<Header />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
