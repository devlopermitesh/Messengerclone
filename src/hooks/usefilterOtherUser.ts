import { useEffect, useState } from "react";
import { Chat, Message, User } from "@prisma/client";
import { getSession } from "next-auth/react";

export interface ChatListProps extends Chat {
    messages: Message[];
    user: User[];
}

const useFilterOtherUser = ({ data }: { data: ChatListProps |null }) => {
    const [otherUser, setOtherUser] = useState<User | null>(null);
    useEffect(() => {
        const fetchSession = async () => {
            const currentUser = await getSession();
            if (!currentUser || typeof currentUser !== "object" || !("user" in currentUser)) {
                setOtherUser(null);
                return;
            }
            const filteredUser = data?.user?.find((user: User) => user.id !== currentUser.user.id) || null;
            console.log("Filtered User:", filteredUser);

            setOtherUser(filteredUser);
        };

        fetchSession();
    }, [data?.user]); // Re-run when `data.user` changes

    return otherUser;
};

export default useFilterOtherUser;
