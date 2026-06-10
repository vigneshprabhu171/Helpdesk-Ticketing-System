import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div>
      <Sidebar />

      <div
        className="p-4"
        style={{
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",

          marginLeft: "260px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
