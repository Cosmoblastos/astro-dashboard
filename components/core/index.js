import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export function useSession () {
    const router = useRouter(),
        [windowLoaded, setWindowLoaded] = useState(false),
        [token, setToken] = useState(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const _token = localStorage.getItem('auth-token');
        if (!_token) return router.push('/login');
        setToken(_token);
    }, [token, router, windowLoaded]);

    return token;
}
export default {
    useSession
};