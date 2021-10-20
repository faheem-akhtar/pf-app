import { UserModelInterface } from 'services/user/model.interface';

export const userModelStub = (user: Partial<UserModelInterface> = {}): UserModelInterface => ({
  userId: '1',
  image: 'https://lh3.googleusercontent.com/a-/AOh14GgAjybktYwQWEFDSAPrQ7yC3KC6l1I1BDyyisoH5Sb=s50',
  email: 'test@propertyfinder.ae',
  first_name: 'FirstName',
  last_name: 'LastName',
  ...user,
});
