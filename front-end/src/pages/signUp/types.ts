export interface State {
  displayName: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

export type Action =
  | { type: "change_display_name"; payload: string }
  | { type: "change_username"; payload: string }
  | { type: "set_password"; payload: string }
  | { type: "set_confirm_password"; payload: string };
