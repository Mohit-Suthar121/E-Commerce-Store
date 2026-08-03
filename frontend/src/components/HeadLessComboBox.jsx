import React from 'react'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'

const HeadLessComboBox = ({value, onChange,options}) => {

    
    const [query, setQuery] = useState('')

    const filteredOptions =
        query === ''
            ? options
            : options.filter((option) => {
                return option.toLowerCase().includes(query.toLowerCase())
            })
    return (
        <div className="w-full">
            <Combobox value={value} onChange={onChange} onClose={() => setQuery('')}>
                <div className="relative">
                    <ComboboxInput
                        className={clsx(
                            'w-full h-10 rounded-xl border border-neutral-900 bg-neutral-950 py-1.5 pr-8 pl-3.5 text-sm text-neutral-200 placeholder-neutral-700',
                            'transition-all duration-200 outline-none focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5'
                        )}
                        displayValue={(option) => option}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 flex items-center">
                        <ChevronDownIcon className="size-4 fill-neutral-600 group-data-hover:fill-neutral-300 transition-colors" />
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                        'w-(--input-width) rounded-xl border border-neutral-900 bg-[#0b0b0b] p-1 shadow-2xl [--anchor-gap:--spacing(1)] empty:invisible',
                        'transition duration-100 ease-in data-leave:data-closed:opacity-0',
                        'max-h-60! overflow-y-auto scrollbar-design'
                    )}
                >
                    {filteredOptions.map((option, index) => (
                        <ComboboxOption
                            key={index}
                            value={option}
                            className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-emerald-500/10"
                        >
                            <CheckIcon className="invisible size-4 fill-emerald-500 group-data-selected:visible" />
                            <div className="text-sm text-neutral-200 group-data-selected:text-white group-data-selected:font-medium">{option}</div>
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>
        </div>
    )
}

export default HeadLessComboBox