"use client";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {FormControl} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Check, ChevronsUpDown} from "lucide-react";
import {UseFormSetValue} from "react-hook-form";

type Props = {
    items: { value: string; label: string }[];
    fieldValue: string | number;
    key: string;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue: UseFormSetValue<any>;
    hint: string;
    loading?: boolean;
}

function FormDropdown({items, fieldValue, setValue, key, hint, loading}: Props) {

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
                                        (item) => item.value === fieldValue
                                    )?.label
                                    : hint
                        }
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0 xl:w-[500px] pointer-events-auto">
                <Command>
                    <CommandInput placeholder="Search..."/>
                    <CommandList>
                        <CommandEmpty>No items found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    value={item.label}
                                    key={item.value}
                                    className={"cursor-pointer"}
                                    onSelect={() => {
                                        setValue(key, item.value)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            item.value === fieldValue
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )

}

export default FormDropdown;