import "./layout.scss";

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <main className="layout">
    {children}
  </main>
);
