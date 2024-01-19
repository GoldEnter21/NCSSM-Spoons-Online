import Leaderboards from "./Leaderboards.js";
import React from 'react';

/**
 * Used to output the HomePage to the screen
 * @returns the HomePage with inputs of the users and locations of eliminations since HomePage cannot use React Hooks
 */
export default function ShowLeaderboards() {
    return (
        <div className="leaderboards">
            <Leaderboards/>
        </div>
    )
}
