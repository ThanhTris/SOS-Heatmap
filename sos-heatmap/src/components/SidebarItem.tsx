export interface SidebarItemProps {
  label: string;
  link: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, link }) => {
  return (
    <a href={link} className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
      {label}
    </a>
  );
};

export default SidebarItem;