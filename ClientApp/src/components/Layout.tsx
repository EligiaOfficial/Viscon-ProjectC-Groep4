import Nav from "./Nav";
import SideBar from "./SideBar";

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-screen flex flex-col">
      <Nav />
      <div className="relative flex flex-row h-full max-w-screen overflow-hidden bg-stone-200 dark:bg-stone-700">
        <SideBar />
        <div
          className={`ml-[50px] h-full w-full overflow-y-auto ${
            children?.key === "Ticket" ? "" : "p-4"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
