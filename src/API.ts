const API_URL = 'http://henri-potier.xebia.fr/books/';

export const API = ({

    getBooks: async () => (await fetch(API_URL)).json(),

    getOffers: async (url: string[]) => {
        return url.length && (await fetch(`${API_URL}${url}/commercialOffers`)).json();
    }

});
