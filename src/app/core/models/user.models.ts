export interface ListUser {
    status_code?: number;
    data?: userDetail[];
}

export interface User {
    status_code?: number;
    data?: userDetail;
}

export interface userDetail {
    id_user?: number;
    nama?: string;
    email?: string;
    tgl_lahir?: string;
    alamat?: string;
    telepon?: string;
    foto?: string;
    ktp?: string;
    status?: number;
    is_google?: number;
    roles_id?: number;
    is_customer?: number;
    roles?: string;
}
