import { SearchFunction } from "./search-function.type";

export interface ITickerRequest {
    function: SearchFunction;
    keywords: string;
}