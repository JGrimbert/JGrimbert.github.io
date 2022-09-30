export interface IBiblio {
    complete: Array<any>,
    choosen: object,
    selected: Array<any>,
    searched: string,
}

export interface IMerx {
    offers: Array<any>,
    initial: number,
    discounted: number,
}

export interface IFunk {
    value: number,
    discount: number,
    sliceValue: number
}

export interface IDiscount {
    html(arg0:IFunk): string,
    funk(arg0:IFunk): number,
}

export interface IDiscounts {
    [index: string]: IDiscount,
}
