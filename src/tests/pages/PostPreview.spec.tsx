import { render, screen } from "@testing-library/react";

import PostPreview from "../../pages/posts/preview/[slug]";
import { useSession } from "next-auth/react";

jest.mock("../../services/prismic.ts");
jest.mock("next-auth/react");

const post = {
  slug: "my-new-post",
  title: "My New Post",
  content: "<p>Post excerpt</p>",
  updatedAt: "10 de Abril de 2021",
};

describe("PostPreview page", () => {
  it("renders correctly", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      status: "unauthenticated",
      data: null,
    });

    render(<PostPreview post={post} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });
});
