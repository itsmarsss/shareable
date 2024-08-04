import { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/header";
import Input from "../../components/input";
import User from "../../models/user.model";
import { useAuth } from "../../components/authProvider";

interface QueryResultProps {
    user: User;
    isFriended: boolean;
    onConnectRequest: () => void;
}

const QueryResult: React.FC<QueryResultProps> = ({
    user,
    isFriended,
    onConnectRequest,
}) => {
    return (
        <div className="query-result">
            <h2>{user.displayName}</h2>
            {isFriended ? (
                <button onClick={onConnectRequest}>Connect?</button>
            ) : (
                <></>
            )}
        </div>
    );
};

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [isFriended, setIsFriended] = useState<boolean[]>([]);
    const auth = useAuth();

    useEffect(() => {
        document.getElementById("search")?.classList.add("selected-icon");

        return () => {
            document
                .getElementById("search")
                ?.classList.remove("selected-icon");
        };
    }, []); // Added empty dependency array to run only on mount/unmount

    const handleSearchChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchQuery(event.target.value);

        console.log("AAA");
        const response = await fetch(
            "/api/network/search/" + event.target.value,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            }
        );
        console.log("BBB");

        const res = await response.json();
        console.log(res);

        if (res.success) {
            const justUsers: User[] = [];
            const justIsFriended: boolean[] = [];
            res.users.forEach((user: any) => {
                const { friended, ...userData } = user;
                justUsers.push(userData);
                justIsFriended.push(friended);
            });

            console.log("CCC");

            setUsers(justUsers);
            setIsFriended(justIsFriended);
        }
    };

    const handleConnectionRequest = async (username: string) => {
        const response = await fetch("/api/network/add/" + username, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        });
    };

    return (
        <div className="container">
            <Header />
            <Input
                value={searchQuery}
                onChange={handleSearchChange}
                className="input-field-search"
            />
            <div className="content">
                <div className="array">
                    {users.map((user, index) => (
                        <QueryResult
                            user={user}
                            isFriended={isFriended[index]}
                            onConnectRequest={() =>
                                handleConnectionRequest(user.username)
                            }
                            key={user.username}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
