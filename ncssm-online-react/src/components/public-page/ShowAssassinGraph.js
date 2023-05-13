import CallerOfGraphs from "../../javascript-functions/assassingraph.mjs";
import GetUserList from "../../javascript-functions/database-access.mjs";
import { Link } from 'react-router-dom';

export default function ShowAssassinGraph() {
    // const assassinGraph = users.map((user, k) => <UserCard user={user} key={k} />);

    return (
        <div className="column">
            <div className="row">
                <Link to='/admin-only' className='btn btn-primary btn-outline-dark '>
                Back to Admin Page 
                </Link>
            </div>
            <div className="row">
                <CallerOfGraphs userList={GetUserList()} />
            </div>
        </div>
    );
}