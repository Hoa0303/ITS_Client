import { ref } from 'vue';

export interface Product {
    id: number;
    colorId: number;
    name: string;
    discount: number;
    category: string;
    brand: string;
    rating: number;
    imageUrl: string;
    sizescreen: number;
    ram: number;
    rom: number;
    cpu: string;
    price: number;
}

export interface ProductVersion {
    id: number;
    version: number;
    enable: boolean;
    price: number;
}

export interface ProductsData {
    id: number;
    name: string;
    discount: number;
    category: string;
    brand: string;
    imageUrls: string;
    sizeScreen: number;
    scanHz: string;
    material: string;
    rearCam: string;
    frontCam: string;
    color: any;
    cpu: string;
    gpu: string;
    ram: number;
    rom: number;
    battery: string;
    size: string;
    weight: number;
    price: number;
    version: string;
    line: string;
    rating:number;
    ratingCount: number;
}

export function useTableData() {
    const products = ref<Product[]>([]);
    const productsVersion = ref<ProductVersion[]>([])
    const productsData = ref<ProductsData[]>([]);

    function setProduct(data: Product[]) {
        products.value = data;
    }

    function setProductVersion(data: ProductVersion[]) {
        productsVersion.value = data;
    }

    function setProductData(data: ProductsData[]) {
        productsData.value = data;
    }

    return {
        products,
        productsVersion,
        productsData,
        setProduct,
        setProductVersion,
        setProductData
    };
}

