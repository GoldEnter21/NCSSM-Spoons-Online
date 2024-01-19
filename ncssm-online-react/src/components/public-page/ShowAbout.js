import { GetLocationList } from "../../javascript-functions/database-access.mjs";
import About from "./About.js";
import React from 'react';

/**
 * Used to output the HomePage to the screen
 * @returns the HomePage with inputs of the users and locations of eliminations since HomePage cannot use React Hooks
 */
export default function ShowAbout() {
    return (
        <div className="about">
            <About/>
        </div>
    )
    
}
