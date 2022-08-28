import { render, screen } from "@testing-library/react";

import { getPrismicClient } from "../../services/prismic";
import Posts, { getStaticProps } from "../../pages/posts";

jest.mock("../../services/prismic.ts");

const posts = [
  {
    slug: "my-new-post",
    title: "My New Post",
    excerpt: "Post excerpt",
    updatedAt: "Match, 10",
  },
];

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getAllByType: jest.fn().mockResolvedValueOnce([
        {
          uid: "my-new-post",
          data: {
            title: [{ type: "heading", text: "My new post" }],
            content: [{ type: "paragraph", text: "test" }],
          },
          last_publication_date: "04-01-2021",
        },
      ]),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My new post",
              excerpt: "test",
              updatedAt: "01 de abril de 2021",
            },
          ],
        },
      })
    );
  });
});
