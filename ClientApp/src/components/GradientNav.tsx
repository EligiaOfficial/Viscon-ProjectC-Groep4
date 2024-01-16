import visconLogo from "../assets/icons/Viscon-Group_logo-white.svg";
function Nav() {
  return (
    <div className="bg-gradient-to-r from-[#2a3180] via-[#199bd8] to-[#07ab9a] h-[50px] p-1">
      <img className="object-contain h-full" src={visconLogo} />
    </div>
  );
}

export default Nav;
