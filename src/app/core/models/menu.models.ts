export interface listMenu {
    status_code?: number;
    data?: Menu[];
}

export interface Menu {
    id_menu?: number;
    nama?: string;
    kategori?: string;
    harga?: number;
    deskripsi?: string;
    foto?: string;
    status?: number;
}

export interface detailMenu {
    status_code?: number;
    data?: Data;
}

export interface Data {
    menu?: Menu;
    topping?: Topping[];
    level?: Topping[];
}

export interface Topping {
    id_detail?: number;
    id_menu?: number;
    keterangan?: string;
    type?: string;
    harga?: number;
}
