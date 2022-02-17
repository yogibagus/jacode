// get api list
export interface listOrder {
    status_code?: number;
    data?: Order[];
}

export interface Order {
    id_order?: number;
    no_struk?: string;
    nama?: string;
    total_bayar?: number;
    tanggal?: Date;
    status?: number;
    menu?: menuOrder[];
}

export interface menuOrder {
    id_menu?: number;
    kategori?: string;
    nama?: string;
    foto?: string;
    jumlah?: number;
    harga?: string;
    total?: number;
    catatan?: string;
}

// get api detail
export interface detailOrder {
    status_code?: number;
    data?: Data;
}

export interface Data {
    order?: detail;
    detail?: menuOrder[];
}

export interface detail {
    id_order?: number;
    no_struk?: string;
    nama?: string;
    id_voucher?: number;
    nama_voucher?: null;
    diskon?: number;
    potongan?: number;
    total_bayar?: number;
    tanggal?: Date;
    status?: number;
}

