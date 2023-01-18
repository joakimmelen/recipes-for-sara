import { writable } from "svelte/store";

interface Recipe {
    id: string;
    title: string;
	name?: string;
	rating?: number;
    description: string;
    instructions1_title: string;
    instructions1_desc: string;
    instructions2_title: string;
    instructions2_desc: string;
    instructions3_title: string;
    instructions3_desc: string;
    instructions4_title: string;
    instructions4_desc: string;
    instructions5_title: string;
    instructions5_desc: string;
    expand: {
        cuisine: {
            id: string;
            tag: string;
        }[];
    };
    picture: string;
    searchTerms: string;
}

export interface SearchStoreModel {
    data: Recipe[];
    filtered: Recipe[];
    search: string;
}

export const createSearchStore = (data: Recipe[]) => {
    const { subscribe, set, update } = writable<SearchStoreModel>({
        data,
        filtered: data,
        search: "",
    });

    return { subscribe, set, update };
};

export const searchHandler = (store: SearchStoreModel) => {
    const searchTerm = store.search.toLowerCase() || "";
    store.filtered = store.data.filter((item) => {
        return item.searchTerms.toLowerCase().includes(searchTerm);
    });
};