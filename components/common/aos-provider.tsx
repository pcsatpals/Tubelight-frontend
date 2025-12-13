'use client';

import { useEffect } from 'react';
import AOS from 'aos';

export default function AOSProvider() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,        // animate only once
            offset: 120,
        });
    }, []);

    return null;
}
