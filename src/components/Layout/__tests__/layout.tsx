import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "..";

describe("Layout", () => {
    it("renders without crashing", () => {
        render(<Layout />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("renders with title", () => {
        render(<Layout title={<span role="heading">Hello World</span>} />);
        const header = screen.getByRole("heading");
        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent("Hello World");
    });

    it("renders with nav", () => {
        render(<Layout headerNavigationLeft="To the infinity" />);
        const navigation = screen.getByRole("navigation");
        expect(navigation).toBeInTheDocument();
        expect(navigation).toHaveTextContent("To the infinity");
    });

    it("renders with content", () => {
        render(
            <Layout>
                <div>This is content for sure</div>
            </Layout>
        );
        const main = screen.getByRole("main");
        expect(main).toBeInTheDocument();
        expect(main).toHaveTextContent("This is content for sure");
    });
});
