export interface ILab {
    lab_id: number;
    lab_name?: string;
    lab_code?: string;
    lab_comment?: string;
}

export  const defaultLab: ILab = {
    lab_id: 0,
    lab_name: '',
    lab_code: '',
    lab_comment: ''
}