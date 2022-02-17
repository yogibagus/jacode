export interface User {
    status_code?: number;
    data?: Data;
}

export interface Data {
    user?: userDetail;
    token?: string;
}

export interface userDetail {
    id_user?: number;
    email?: string;
    nama?: string;
    pin?: string;
    foto?: string;
    m_roles_id?: number;
    is_google?: number;
    is_customer?: number;
    roles?: string;
    akses?: Akses;
}

export interface Akses {
    auth_user?: boolean;
    auth_akses?: boolean;
    setting_menu?: boolean;
    setting_customer?: boolean;
    setting_promo?: boolean;
    setting_diskon?: boolean;
    setting_voucher?: boolean;
    laporan_menu?: boolean;
    laporan_customer?: boolean;
}
