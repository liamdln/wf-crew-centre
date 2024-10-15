"use client";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {FormControl} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useState} from "react";

type Props = {
    items: { value: string; label: string }[];
    hint: string;
    loading?: boolean;
    value: string | number;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (...event: any[]) => void
}

function FormDropdown({items, value, onChange, hint, loading}: Props) {

    const [searchTerm, setSearchTerm] = useState("");

    const filteredItems = () => {
        return items.filter(item => {
            return item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.value.toLowerCase().includes(searchTerm.toLowerCase())
        })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl className={"w-full"}>
                    <Button
                        variant="outline"
                        role="combobox"
                        disabled={loading}
                        className={cn(
                            "justify-between",
                            !value && "text-muted-foreground"
                        )}
                    >
                        {
                            loading
                                ?
                                <span>Loading...</span>
                                :
                                value
                                    ? items.find(
                                        (item) => item.value === value)?.label
                                    : hint
                        }
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0 xl:w-[500px] pointer-events-auto">
                <div className={"h-min max-h-[calc(100svh/3)] overflow-y-scroll"}>
                    <Input value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           placeholder={"Search..."}
                           className={"w-[474px] focus:outline-none border-none m-3"}
                    />
                    <ul>
                        {
                            filteredItems().slice(0, 50).map(item => (
                                <li key={item.value}
                                    value={item.value}
                                    className={"flex gap-1 items-center p-1.5 cursor-pointer hover:bg-accent hover:text-accent-foreground"}
                                    onClick={() => {
                                        onChange(item.value)
                                    }}
                                >
                                    <Check
                                        className={cn("mr-2 h-4 w-4",
                                            item.value === value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {item.label}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </PopoverContent>
        </Popover>
    )

}

export default FormDropdown;