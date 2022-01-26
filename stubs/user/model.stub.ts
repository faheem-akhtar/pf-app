import { UserInterface } from 'components/user/interface';

export const userModelStub = (user: Partial<UserInterface> = {}): UserInterface => ({
  userId: '1',
  image: 'https://lh3.googleusercontent.com/a-/AOh14GgAjybktYwQWEFDSAPrQ7yC3KC6l1I1BDyyisoH5Sb=s50',
  email: 'test@propertyfinder.ae',
  first_name: 'FirstName',
  last_name: 'LastName',
  ...user,
});
