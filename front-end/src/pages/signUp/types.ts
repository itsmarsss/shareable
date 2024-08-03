export interface State {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type Action =
  | { type: "change_first_name"; payload: string }
  | { type: "change_last_name"; payload: string }
  | { type: "change_username"; payload: string }
  | { type: "change_email"; payload: string }
  | { type: "set_password"; payload: string }
  | { type: "set_confirm_password"; payload: string };
