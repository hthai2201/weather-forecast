'use client';

import {
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { useState, useRef, useCallback, type KeyboardEvent } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Check, MapPin, SearchIcon } from 'lucide-react';

export type Option = Record<'value' | 'label', string> & Record<string, any>;

type AutoCompleteProps = {
  options: Option[];
  emptyMessage: string;
  value?: Option;
  onValueChange?: (value: Option) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  inputValue?: string;
  onInputValueChange?: (value: string) => void;
};

export const AutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  disabled,
  isLoading = false,
  inputValue,
  onInputValueChange,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(value as Option);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === 'Enter' && input.value !== '') {
        const optionToSelect = options.find(
          option => option.label === input.value,
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }

      if (event.key === 'Escape') {
        input.blur();
      }
    },
    [isOpen, options, onValueChange],
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      setSelected(selectedOption);
      onValueChange?.(selectedOption);

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange],
  );

  return (
    <CommandPrimitive onKeyDown={handleKeyDown} shouldFilter={false}>
      <CommandList>
        <div
          data-slot="command-input-wrapper"
          className="flex h-10 items-center gap-2 border-b px-3"
        >
          <MapPin className="size-4 shrink-0 opacity-50" />
          <CommandPrimitive.Input
            data-slot="command-input"
            className={cn(
              'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
              'text-base',
            )}
            ref={inputRef}
            value={inputValue}
            onValueChange={isLoading ? undefined : onInputValueChange}
            onBlur={handleBlur}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
          />
          <SearchIcon className="size-4 shrink-0 opacity-50" />
        </div>
      </CommandList>
      <div className="relative mt-1">
        {isOpen ? (
          <div className="animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-stone-50 outline-none">
            <CommandList className="rounded-lg ring-1 ring-slate-200">
              {isLoading ? (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              ) : null}
              {options.length > 0 && !isLoading ? (
                <CommandGroup>
                  {options.map(option => {
                    const isSelected = selected?.value === option.value;
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onMouseDown={event => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onSelect={() => handleSelectOption(option)}
                        className={cn(
                          'flex w-full items-center gap-2',
                          !isSelected ? 'pl-8' : null,
                        )}
                      >
                        {isSelected ? <Check className="w-4" /> : null}
                        {option.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ) : null}
              {!isLoading ? (
                <CommandPrimitive.Empty className="rounded-sm px-2 py-3 text-center text-sm select-none">
                  {emptyMessage}
                </CommandPrimitive.Empty>
              ) : null}
            </CommandList>
          </div>
        ) : null}
      </div>
    </CommandPrimitive>
  );
};
