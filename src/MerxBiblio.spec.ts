import { shallowMount } from '@vue/test-utils'
import { biblio, merx } from './states';
import MerxBiblio from './MerxBiblio.vue'
import { API } from "./API";

describe('MerxBiblio', () => {

    const mountBiblio = (biblio = [{}]) => {
        API.getBooks = jest.fn(() => Promise.resolve(biblio));
        return shallowMount(MerxBiblio);
    }

    it(`should fetch book list on mounted and update Biblio & Merx`, async () => {
        await mountBiblio([{}, {}]);
        expect(API.getBooks).toHaveBeenCalledTimes(1);
        expect(biblio).toHaveProperty("complete", [{},{}]);
        expect(biblio).toHaveProperty("choosen", {});
        expect(biblio).toHaveProperty("searched", "");
        expect(biblio).toHaveProperty("selected", []);
        expect(merx).toHaveProperty("offers", undefined);
        expect(merx).toHaveProperty("initial",0);
        expect(merx).toHaveProperty("discounted",undefined);
    });

    it(`should contain the proposal, discount and bag components`, async () => {
        const wrapper = await mountBiblio();
        expect(wrapper.html()).toMatchSnapshot();
    });
})
