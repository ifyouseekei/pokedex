"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchForm() {
    // const [searchText, setSearchText] = useState('');
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleChange = (term: string) => {
        // setSearchText(event.target.value);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('s', term);
        } else {
            params.delete('s');
        }
        replace(`${pathname}?${params.toString()}`);
    };
    return (
        <div className="search-box mb-6">
            <input
                type="text"
                className="border-2 border-sky-500"
                onChange={(e) => { handleChange(e.target.value) }}
                defaultValue={searchParams.get('s')?.toString()}
            ></input>
        </div>
    )
}