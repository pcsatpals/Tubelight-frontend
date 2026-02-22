"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const TopSearchBar = () => {
    const searchParams = useSearchParams();
    const defultQuery = searchParams.get("query");
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();
    const [query, setQuery] = useState(defultQuery || "");

    const pathname = usePathname();

    if (pathname != "/dashboard") return;

    return (
        <div className="absolute left-13 sm:left-1/3 lg:left-1/2 sm:-translate-x-1/2 lg:w-1/3 sm:w-[45%] w-[40%] grow flex h-8 sm:h-9">
            <div className='relative h-full w-full'>
                <Input
                    placeholder='Search'
                    className={`w-full rounded-full sm:rounded-r-none h-full ${isFocused ? "pl-8" : ""}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {isFocused && <Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4' />}
            </div>
            <Button
                onClick={() => {
                    if (query.trim() === "") {
                        router.push(`/dashboard`);
                    } else {
                        router.push(`/dashboard?query=${query}`);
                    }
                }}
                className={`!bg-muted h-full hidden sm:block border border-input rounded-r-full text-white ${isFocused ? "ring-ring/50 ring-[3px] " : ""}`}
            >
                <Search />
            </Button>
        </div>
    )
}

export default TopSearchBar
