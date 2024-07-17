import { createContext, PropsWithChildren, useState } from "react";

export const UserDetailsContext = createContext({
    userNfts: [] as string[],
    setUserNfts: (() => void 0) as (args?: string[]) => void
});

export const UserDetailsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [userNfts, setUserNfts] = useState<string[]>([]);

    const handleSetUserNfts = (args?: string[]) => setUserNfts(args ?? []);

    return (
        <UserDetailsContext.Provider value={{ userNfts, setUserNfts: handleSetUserNfts }}>
            {children}
        </UserDetailsContext.Provider>
    );
};
