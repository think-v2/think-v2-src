import { Link } from "react-router-dom";

type ProjectCardProps = {
  to: string;
  title: string;
  date: string;
};

const ProjectCard = ({ to, title, date }: ProjectCardProps) => {
  return (
    <Link to={to}>
      <div
        className="flex items-center justify-center flex-col
          scale-100 hover:scale-110 transition-all
          outline-4 outline-gray-500 text-3xl w-80 h-40 rounded-2xl bg-gray-200 text-black"
      >
        <div className="text-3xl">{title}</div>
        <div className="text-lg">{date}</div>
      </div>
    </Link>
  );
};

export default ProjectCard;
