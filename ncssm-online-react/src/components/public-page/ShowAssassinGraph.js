import { Link } from 'react-router-dom';

/**
 * Shows the graph to the screen
 * @returns the graph of players while inputting the user list, since CallerOfGraphs cannot use React Hooks
 */
export default function ShowAssassinGraph() {
    return (
        <div className="column">
            <div className="row">
                <Link to='/admin-only' className='btn btn-primary btn-outline-dark '>
                Back to Admin Page 
                </Link>
            </div>
            <div className="row">
                <p> No longer available :( </p>
            </div>
        </div>
    );
}