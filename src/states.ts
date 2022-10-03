import {reactive, watchEffect} from "vue";
import {IBiblio, IDiscounts, IMerx} from "./model";
import {API} from "./API";

export const merx: IMerx = reactive({
    offers: [],
    initial: 0,
    discounted: 0
});

export const biblio: IBiblio = reactive({
    complete: [],
    selected: [],
    choosen: [],
    searched: "",
});

export const discounts: IDiscounts = {
    percentage: {
        html: ({ value }) => `Profitez d'une remise de ${value}%`,
        funk: ({ value, discount}) => value - (value/100)*discount,
    },
    minus: {
        html: ({ value }) => `Économisez directement ${value}€ en caisse`,
        funk: ({ value, discount}) => value - discount,
    },
    slice: {
        html: ({ value, sliceValue }) => `Vous pourriez bénéficier de la réduction de ${value}€ par tranche de ${sliceValue}€ d'achat`,
        funk: ({ value, discount, sliceValue}) => value - Math.floor(value/sliceValue) * discount,
    }
}

watchEffect(async () => {
    const { choosen, url, initial } = newOfferProposition(biblio.selected);
    /* (୨୧ ❛ᴗ❛) Set merx attributes */
    merx.offers = (await API.getOffers(url))?.offers;
    merx.initial = initial;
    merx.discounted = sumDiscounts();
    /* (୨୧ ❛ᴗ❛) Set choosen biblio */
    biblio.choosen = choosen;
});

function newOfferProposition (arr: any[], initial = 0) {

    const choosen = arr ? arr.reduce((acc, cur) => {
        initial = initial + cur.price
        return { ...acc, [cur.isbn]: cur }
    }, {}) : {}

    return { choosen, initial, url: Object.keys(choosen) };

}

function sumDiscounts() {
    return merx.offers && merx.offers.reduce((acc, cur) => {

        return discounts[cur.type].funk({
            value:acc,
            discount:cur.value,
            sliceValue:cur.sliceValue
        });

    }, merx.initial)
}
