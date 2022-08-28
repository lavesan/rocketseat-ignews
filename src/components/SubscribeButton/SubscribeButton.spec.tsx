import { render, screen, fireEvent } from "@testing-library/react";
import { useSession, signIn } from "next-auth/react";
import { SubscribeButton } from ".";

const useRouter = jest.spyOn(require("next/router"), "useRouter");
jest.mock("next-auth/react");

describe("SubscribeButton component", () => {
  it("renders correctly", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      status: "unauthenticated",
      data: null,
    });

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirects user to sign in when not authenticated", () => {
    const signInMocked = jest.mocked(signIn);
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      status: "unauthenticated",
      data: null,
    });

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it("redirects to posts when user already has a subscription", () => {
    const useSessionMocked = jest.mocked(useSession);
    const pushMock = jest.fn();

    useRouter.mockImplementation(
      () =>
        ({
          push: pushMock,
        } as any)
    );

    useSessionMocked.mockReturnValueOnce({
      status: "authenticated",
      data: {
        user: {
          name: "Valdery",
          email: "test@test.com",
        },
        activeSubscription: "fake-activity-subscription",
        expires: "fake-expires",
      },
    });

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith("/posts");
  });
});
