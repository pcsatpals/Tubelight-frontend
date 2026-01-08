import { useEffect, useState } from "react";

export default function useMounted() {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    return mounted;
}