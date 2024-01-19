import { GetLocationList } from "../../javascript-functions/database-access.mjs";
import Map2 from "./Map2.js";
import React from 'react';

/**
 * Used to output the HomePage to the screen
 * @returns the HomePage with inputs of the users and locations of eliminations since HomePage cannot use React Hooks
 */
export default function ShowMap2() {
    return (
        <div className="map2">
            <Map2/>
        </div>
    )
    
}
