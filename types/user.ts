export interface IUserModel {
    user_id: string;
    user_name: string;
    user_surname: string;
    position_id: number;
    permission_id: number;
    user_login: string;
    user_passwd: string;
    confirm_passwd?: string;
    user_status_id: number;
    user_status: string;
    position: string;
    permission: string;
    quo_prefix?: string;
    email?: string;
    phone?: string;
}


export const defaultUser: IUserModel = {
    user_id: '',
    user_name: '',
    user_surname: '',
    position_id: 0,
    permission_id: 0,
    user_login: '',
    user_passwd: '',
    confirm_passwd: '',
    user_status_id: 0,
    user_status: '',
    position: '',
    permission: '',
    quo_prefix: undefined,
    email: undefined,
    phone: undefined
  };