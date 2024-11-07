export interface IInstrument {
    inst_id: number;
    inst_name: string;
}

export  const defaultInstrument: IInstrument = {
    inst_id: 0,
    inst_name: '',
}