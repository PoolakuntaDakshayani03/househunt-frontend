export const getUser = () => {
  return {
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    role: localStorage.getItem('role'),
  };
};

export const logout = () => {
  localStorage.clear();
  window.location.href = '/login';
}