import { shallowMount } from '@vue/test-utils'
import { biblio, merx } from '../states';
import MerxBiblioDiscount from './MerxBiblioDiscount.vue'
import {API} from "../API";

const offers =  [
    { type: "percentage", value: 4 },
    { type: "minus", value: 15 },
    { type: "slice", sliceValue: 100, value: 12 }
];

biblio.complete = [
    { isbn:"0", title: "zéro", price: 0, cover: '0.jpg' },
    { isbn:"1", title: "un", price: 1, cover: '1.jpg' },
    { isbn:"2", title: "deux", price: 2, cover: '2.jpg' },
    { isbn:"3", title: "trois", price: 3, cover: '3.jpg' },
    { isbn:"4", title: "quatre", price: 4, cover: '4.jpg' },
];

const mountDiscount = (offer: Array<any> = []) => {
    API.getOffers = jest.fn(() => Promise.resolve({ offers: offer }));
    return shallowMount(MerxBiblioDiscount);
}

describe('MerxBiblioDiscount', () => {
    it(`When no offers exists, display nothing`, () => {
        expect(mountDiscount().find('#offers').exists()).toBeFalsy()
    });
    it(`When no price exists, propose user to make a choice`, () => {
        expect(mountDiscount().find('#CTA').text()).toBe("Sélectionnez les produits de votre choix")
    });
    it(`When offers exist, show them`, async () => {
        const wrapper = mountDiscount(offers);
        biblio.selected = [{}];
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        expect(wrapper.findAll('#offers li').at(0)?.text()).toBe("Profitez d'une remise de 4%")
        expect(wrapper.findAll('#offers li').at(1)?.text()).toBe("Économisez directement 15€ en caisse")
        expect(wrapper.findAll('#offers li').at(2)?.text()).toBe("Vous pourriez bénéficier de la réduction de 12€ par tranche de 100€ d'achat")
    });
    it(`When an offer exists, show the initial price, the discount and the difference`, async () => {
        const wrapper = mountDiscount(offers);
        biblio.selected = [{ price: 30 }, { price: 35 }];
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        expect(wrapper.findAll('#prices li').at(0)?.text()).toBe("Prix initial: 65€")
        expect(wrapper.findAll('#prices li').at(1)?.text()).toBe("Avec remise: 47.4€")
        expect(wrapper.findAll('#prices li').at(2)?.text()).toBe("Soit une réduction de 17.6€")
    });
})
