/**
 * @author Oscar Tsakam
*/

import { Owner } from "app/owners/owner";

export interface Search {
    value : string;
    owners : Owner[];
}