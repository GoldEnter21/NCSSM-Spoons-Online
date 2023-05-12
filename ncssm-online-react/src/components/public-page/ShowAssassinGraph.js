import CallerOfGraphs from "../../javascript-functions/assassingraph.mjs";
import GetUserList from "../../javascript-functions/database-access.mjs";

export default function ShowAssassinGraph() {
    // const assassinGraph = users.map((user, k) => <UserCard user={user} key={k} />);

    return (
        <div>
            <CallerOfGraphs userList={GetUserList()}/>
        </div>
    );
}