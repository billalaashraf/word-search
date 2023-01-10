import { ISearchModel } from "../interfaces/searchModel";

class SearchModel {

    private data: ISearchModel;
    constructor( searched: ISearchModel) {
        this.data = searched
    }

    static findTerm() {
        let rt: ISearchModel;
        return rt;
    }
}