import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => (
    <div>
        <Navbar />
        <main style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
            {children}
        </main>
    </div>
);

export default Layout;