
import { House, List, User } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";

const TabBar = () => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 py-2 px-4 flex justify-around">
      <TabItem 
        to="/"
        icon={<House size={24} weight={path === "/" ? "fill" : "regular"} />}
        label="Home"
        isActive={path === "/"}
      />
      
      <TabItem 
        to="/projects"
        icon={<List size={24} weight={path.includes("/project") ? "fill" : "regular"} />}
        label="Projects"
        isActive={path.includes("/project")}
      />
      
      <TabItem 
        to="/about"
        icon={<User size={24} weight={path.includes("/about") ? "fill" : "regular"} />}
        label="About"
        isActive={path.includes("/about")}
      />
    </div>
  );
};

interface TabItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const TabItem = ({ to, icon, label, isActive }: TabItemProps) => (
  <Link
    to={to}
    className={`flex flex-col items-center text-xs ${
      isActive ? "text-primary-500" : "text-gray-500"
    }`}
  >
    <div className="mb-1">{icon}</div>
    <span>{label}</span>
  </Link>
);

export default TabBar;
