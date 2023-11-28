import Nav from "./Nav";
import SideBar from "./SideBar";

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-screen flex flex-col">
      <Nav />
      <div className="relative flex flex-row h-full w-full overflow-y-hidden bg-stone-200">
        <SideBar />
        <div className="h-full w-full overflow-y-auto">
          <div className="p-4 flex flex-col gap-4 w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
