export const redirectUser = (role, navigate) => {
  if (role === 'admin') navigate('/admin');
  else if (role === 'owner') navigate('/owner');
  else navigate('/');
};
