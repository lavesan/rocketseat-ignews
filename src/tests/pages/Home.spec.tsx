import { render, screen } from "@testing-library/react";

import { stripe } from "../../services/stripe";
import Home, { getStaticProps } from "../../pages";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("next-auth/react", () => ({
  useSession: () => ({
    status: "unauthenticated",
    data: null,
  }),
}));
jest.mock("../../services/stripe.ts");

describe("Home page", () => {
  it("renders correctly", () => {
    render(<Home product={{ id: "fake-price-id", amount: "R$ 10,00" }} />);

    expect(screen.getByText(/R\$ 10,00/i)).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const retrieveStripeMocked = jest.mocked(stripe.prices.retrieve);

    retrieveStripeMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-price-id",
            amount: "$10.00",
          },
        },
      })
    );
  });
});
