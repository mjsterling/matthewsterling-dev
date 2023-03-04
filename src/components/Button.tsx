export const Button = ({
  variant,
  children,
}: {
  variant: 'primary' | 'secondary' | 'green';
  children: React.ReactNode;
}) => (
  <button
    style={{ width: '300px' }}
    className={`rounded-lg text-xl p-3 border-4 border-white 
      ${
        variant === 'primary'
          ? 'bg-primary-500 hover:bg-white hover:border-primary-500 hover:text-primary-500 '
          : ''
      } 
      ${
        variant === 'secondary'
          ? 'bg-secondary-700 hover:bg-white hover:border-secondary-700 hover:text-secondary-700 '
          : ''
      }
      ${
        variant === 'green'
          ? 'bg-green-600 hover:bg-white hover:border-green-600 hover:text-green-600 '
          : ''
      }`}
  >
    {children}
  </button>
);
