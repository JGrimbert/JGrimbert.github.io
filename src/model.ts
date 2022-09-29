import { reactive } from 'vue'

interface IBiblio {
    complete: Array<any>,
    choosen: object,
    selected: Array<any>,
    searched: string,
}

interface IMerx {
    offers: Array<any>,
    initial: number,
    discounted: number,
}

interface IDiscounts {
    percentage: object,
    minus: object,
    slice: object,
}

export const merx: IMerx = reactive({
    offers: [],
    initial: 0,
    discounted: 0
});

export const biblio: IBiblio = reactive({
    complete: [],
    selected: [],
    choosen: {},
    searched: "",
});

export const discounts: IDiscounts = {
    percentage: {
        html: ({ value }) => `Profitez d'une remise de ${value}%`,
        funk: (price, discount) => price - (price/100)*discount
    },
    minus: {
        html: ({ value }) => `Dont ${value}€ directement en caisse`,
        funk: (price, discount) => price - discount
    },
    slice: {
        html: ({ value, sliceValue }) => `Vous bénéficierez de la réduction de ${value}€ par tranche de ${sliceValue}€ d'achat`,
        funk: (price, discount, slice) => price - Math.floor(price/slice) * discount
    }
}
