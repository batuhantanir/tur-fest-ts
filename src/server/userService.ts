import axios from 'axios';

export const userService = {
  authenticate,
};

async function authenticate(email: string, password: string) {
  const response = await axios.post(`https://emur.dev/auth/login`, {
    email: email,
    password: password,
  });
  if (response.status !== 200) {
    throw new Error('Invalid credentials');
  };
  return response.data.data;
}
