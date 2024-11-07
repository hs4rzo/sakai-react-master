export interface ICertAddress {
    cert_id: number;
    cert_name?: string;
    cert_address?: string;
}

export  const defaultCertAddress: ICertAddress = {
    cert_id: 0,
    cert_name: '',
    cert_address: ''
}