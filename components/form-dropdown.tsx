"use client";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {FormControl} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {UseFormSetValue} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {useState} from "react";

type Props = {
    items: { value: string; label: string }[];
    fieldValue: string | number;
    formKey: string;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue: UseFormSetValue<any>;
    hint: string;
    loading?: boolean;
}

function FormDropdown({items, fieldValue, setValue, formKey, hint, loading}: Props) {

    const [searchTerm, setSearchTerm] = useState("");

    const filteredItems = () => {
        return items.filter(item => {
            return item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.value.toLowerCase().includes(searchTerm.toLowerCase())
        })
    }

    const setFormValue = (value: string | number) => {
        setValue(formKey, value)
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
                            !fieldValue && "text-muted-foreground"
                        )}
                    >
                        {
                            loading
                                ?
                                <span>Loading...</span>
                                :
                                fieldValue
                                    ? items.find(
                                        (item) => item.value === fieldValue)?.label
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
                                        setFormValue(item.value)
                                    }}
                                >
                                    <Check
                                        className={cn("mr-2 h-4 w-4",
                                            item.value === fieldValue
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
                {/*<Command>*/}
                {/*    <CommandInput placeholder="Search..."/>*/}
                {/*    <CommandList>*/}
                {/*        <CommandEmpty>No items found.</CommandEmpty>*/}
                {/*        <CommandGroup>*/}
                {/*            {items.map((item) => (*/}
                {/*                <CommandItem*/}
                {/*                    value={item.label}*/}
                {/*                    key={item.value}*/}
                {/*                    className={"cursor-pointer"}*/}
                {/*                    onSelect={() => {*/}
                {/*                        setValue(key, item.value)*/}
                {/*                    }}*/}
                {/*                >*/}
                {/*                    <Check*/}
                {/*                        className={cn(*/}
                {/*                            "mr-2 h-4 w-4",*/}
                {/*                            item.value === fieldValue*/}
                {/*                                ? "opacity-100"*/}
                {/*                                : "opacity-0"*/}
                {/*                        )}*/}
                {/*                    />*/}
                {/*                    {item.label}*/}
                {/*                </CommandItem>*/}
                {/*            ))}*/}
                {/*        </CommandGroup>*/}
                {/*    </CommandList>*/}
                {/*</Command>*/}
            </PopoverContent>
        </Popover>
    )

}

export default FormDropdown;