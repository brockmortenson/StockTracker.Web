import { SearchFunction } from "./search-function.type";

export interface ISearchRequest {
    function: SearchFunction;
    keywords?: string;
    symbol?: string;
    interval?: string;
}