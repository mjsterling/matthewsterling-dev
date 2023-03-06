export const Button = ({
  variant,
  children,
}: {
  variant: 'primary' | 'secondary' | 'green';
  children: React.ReactNode;
}) => (
  <button
    style={{ width: '300px' }}
    className={`rounded-lg text-xl p-3 border-4 border-white text-white hover-shadow hover:opacity-100
      ${variant === 'primary' ? 'bg-primary-500' : ''} 
      ${variant === 'secondary' ? 'bg-secondary-700' : ''}
      ${variant === 'green' ? 'bg-green-600' : ''}`}
  >
    {children}
  </button>
);
