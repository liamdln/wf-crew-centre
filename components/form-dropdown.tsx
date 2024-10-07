import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {FormControl} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Check, ChevronsUpDown} from "lucide-react";

type Props = {
    items: { value: string; label: string }[];
    fieldValue: string | number;
    key: string;
    setValue: (key: string, value: string) => void;
}

function FormDropdown({ items, fieldValue, setValue, key }: Props) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "justify-between",
                            !fieldValue && "text-muted-foreground"
                        )}
                    >
                        {fieldValue
                            ? items.find(
                                (item) => item.value === fieldValue
                            )?.label
                            : "Select language"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    value={item.label}
                                    key={item.value}
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