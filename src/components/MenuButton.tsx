export const MenuButton = ({
  open,
  setOpen,
  visible,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
}) => (
  <svg
    width="34"
    height="32"
    onClick={() => setOpen((prev) => !prev)}
    style={{ opacity: +visible }}
  >
    <path
      className="transition-all"
      d="M4,4  h28"
      strokeWidth="4"
      strokeLinecap="round"
      stroke="white"
      style={{
        transformOrigin: 'left top',
        transform: open ? ' translateX(4px) rotate(45deg) scaleX(1.04)' : '',
      }}
    />
    <path
      className="transition-all"
      d="M4,16 h28"
      strokeWidth="4"
      strokeLinecap="round"
      stroke="white"
      style={{ opacity: +!open }}
    />
    <path
      className="transition-all"
      d="M4,28 h28"
      strokeWidth="4"
      strokeLinecap="round"
      stroke="white"
      style={{
        transformOrigin: 'left bottom',
        transform: open ? ' translateX(4px) rotate(-45deg) scaleX(1.04)' : '',
      }}
    />
  </svg>
);
