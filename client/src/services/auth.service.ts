const apiUrl = 'http://localhost:5000/api/v1';

const auth = (route: string, email: string, password: string): Promise<void> => {
  return fetch(`${apiUrl}/auth/${route}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `email=${email}&password=${password}`,
  })
    .then((res: Response) => res.json())
    .then((res: { token?: string; errors?: { msg: string }[] }) => {
      if (res.errors) throw res.errors.map((err: { msg: string }) => err.msg).join('/n');
      return res;
    })
    .then((res: { token?: string }) => {
      res.token && localStorage.setItem('token', res.token);
    })
    .catch((error: object) => {
      console.log('Login error', error);
      throw error;
    });
};

export const signIn = (email: string, password: string): Promise<void> => {
  return auth('signin', email, password);
};

export const signUp = (email: string, password: string): Promise<void> => {
  return auth('signup', email, password);
};

export const signOut = (): Promise<void> => {
  return Promise.resolve(localStorage.removeItem('token'));
};
