import { SetStateAction } from 'react';
import { auth } from '../config';

function Logout(setAunthificated: {
  (value: SetStateAction<boolean>): void;
  (arg0: boolean): void;
}) {
  auth.signOut();
  setAunthificated(false);
}
export default Logout;
