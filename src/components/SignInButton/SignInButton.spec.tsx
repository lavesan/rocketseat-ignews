import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { SignInButton } from ".";

jest.mock("next-auth/react");

describe("SignInButton component", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      status: "unauthenticated",
      data: null,
    });

    render(<SignInButton />);

    expect(screen.getByText("Sign in with github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      status: "authenticated",
      data: {
        user: {
          name: "Valdery",
        },
        expires: "999",
      },
    });

    render(<SignInButton />);

    expect(screen.getByText("Valdery")).toBeInTheDocument();
  });
});
