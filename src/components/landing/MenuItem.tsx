import { Link } from "react-scroll";

const MenuItem = ({ title, id }: { title: string; id: string }) => {
  return (
    <li className="px-4 relative group">
      <Link
        to={id}
        smooth={true}
        duration={500}
        offset={-70}
        className="relative inline-block py-2"
      >
        {title}
        <span
          className="absolute bottom-0 left-1/2 h-0.5 bg-blue-500 transition-all duration-300 
                w-0 group-hover:w-full group-hover:left-0"
        ></span>
      </Link>
    </li>
  );
};

export default MenuItem;
