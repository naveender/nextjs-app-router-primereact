import axiosInstance from './axiosInstance';

export const getUsers = async () => {
  const response = await axiosInstance.get('/api/users');
  return response.data;
};

export const addUser = async (user) => {
  await axiosInstance.post('/api/users', user);
};

export const updateUser = async (user) => {
  await axiosInstance.put('/api/users', user);
};

export const deleteUser = async (id) => {
  await axiosInstance.delete('/api/users', { data: { id } });
};
