import { shallowMount } from '@vue/test-utils'
import { biblio } from '../model';
import MerxBiblioProposal from './MerxBiblioProposal.vue'
import {API} from "../API";

const bibs = [
    { isbn:"0", title: "zéro", price: 0, cover: '0.jpg' },
    { isbn:"1", title: "un", price: 1, cover: '1.jpg' },
    { isbn:"2", title: "deux", price: 2, cover: '2.jpg' },
    { isbn:"3", title: "trois", price: 3, cover: '3.jpg' },
    { isbn:"4", title: "quatre", price: 4, cover: '4.jpg' },
];

const mountProposal = (offers = [{ "type": "percentage", "value": 4 }]) => {
    API.getOffers = jest.fn(() => {
        return Promise.resolve({ offers })
    });
    biblio.complete = bibs;
    return shallowMount(MerxBiblioProposal);
}

describe('MerxBiblio', () => {

    afterEach(() => {
        biblio.selected = [];
        jest.resetAllMocks();
    });

    it(`Should display the founded books, connected in DOM to checkbox`, () => {
        const wrapper = mountProposal()
        const articles = wrapper.findAll("article");
        const input0 = wrapper.findAll("article")?.at(0)?.find("input");
        const label0 = wrapper.findAll("article")?.at(0)?.find("label");
        expect(articles).toHaveLength(5);
        expect(input0?.attributes("type")).toEqual("checkbox")
        expect(input0?.attributes("id")).toEqual("0")
        expect(label0?.attributes("for")).toEqual("0")
    });
    it(`When user select books, fetch offer proposal with isbn`, async () => {
        const wrapper = mountProposal()
        await wrapper.findAll('input[type="checkbox"]')?.at(0)?.trigger("click");
        await wrapper.findAll('input[type="checkbox"]')?.at(0)?.trigger('change');
        expect(API.getOffers).toHaveBeenCalledWith(["0"])
    });
    it(`When user select multiple books, fetch offer proposal with isbns`, async () => {
        const wrapper = mountProposal()

        await wrapper.findAll('input[type="checkbox"]')?.at(0)?.trigger("click");
        await wrapper.findAll('input[type="checkbox"]')?.at(0)?.trigger('change');
        await wrapper.findAll('input[type="checkbox"]')?.at(1)?.trigger("click");
        await wrapper.findAll('input[type="checkbox"]')?.at(1)?.trigger('change');

        expect(API.getOffers).toHaveBeenLastCalledWith(["0","1"])
    });
    it(`When user type a four word search in input, the fuzzySort change the book list`, async () => {
        const wrapper = mountProposal();
        const input = wrapper.find("input");
        input.element.value = "quat"
        await input.element.dispatchEvent(new Event('input'));
        const articles = wrapper.findAll("article");
        expect(articles).toHaveLength(1)
    })
});
