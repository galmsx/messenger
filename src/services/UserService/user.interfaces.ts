export interface IUserExtendedInfo extends IUser {
  department: IDepartment;
  position: IPosition;
  projects: IProject[];
  socketId?: string;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  public_key: string;
  avatar: string;
  department_id: number;
  position_id: number;
}

export interface IDepartment {
  id: number;
  title: string;
}

export interface IPosition {
  id: number;
  title: string;
}

export interface IProject {
  id: number;
  title: string;
}
