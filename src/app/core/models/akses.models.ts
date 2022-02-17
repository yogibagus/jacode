export interface Akses {
    status_code?: number;
    data?: Data;
}

export interface Data {
    list?: listAkses[];
    totalItems?: number;
}

export interface listAkses {
    id?: number;
    nama?: string;
    akses?: detailAkses;
    is_deleted?: number;
}

export interface detailAkses {
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
