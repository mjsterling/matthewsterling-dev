import { Link } from 'react-router-dom';
import { Socials } from './Socials';

export const Menu = ({ open }: { open: boolean }) => {
  return (
    <div
      style={{
        backdropFilter: open ? 'blur(8px)' : '',
        opacity: +open,
        pointerEvents: open ? 'auto' : 'none',
      }}
      className="p-7 fixed z-40 w-full h-screen bg-[rgba(0,_0,_0,_0.4)] flex flex-col justify-between transition-all"
    >
      <div id="logo-placeholder"></div>
      <div className="h-1/3 justify-evenly flex flex-col w-full items-center">
        <Link
          className="text-xl text-white hover:opacity-80 transition-opacity"
          to="/cv"
        >
          View my CV
        </Link>
        <Link
          className="text-xl text-white hover:opacity-80 transition-opacity"
          to="/projects"
        >
          Projects
        </Link>
        <Link
          className="text-xl text-white hover:opacity-80 transition-opacity"
          to="/contact"
        >
          Message me
        </Link>
      </div>
      <Socials />
    </div>
  );
};
