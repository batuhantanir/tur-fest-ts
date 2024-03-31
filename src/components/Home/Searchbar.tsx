'use client';

import { Card, CardContent } from '../ui/card';

import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import { LuCalendar, LuLocate } from 'react-icons/lu';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { useEffect, useState } from 'react';
import service from '@/lib/axios';

export default function Component() {
  return (
    <div className="flex justify-center items-center relative w-full h-fit px-5 md:px-0 py-10 bg-black/5">
      <div className="relative w-full flex items-center justify-start h-full">
        <div className="w-full md:container md:mx-auto flex justify-center items-center">
          <Card className=" rounded-lg md:border border-0 w-full max-w-[1000px]">
            <CardContent className="p-6">
              <ComboboxForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const FormSchema = z.object({
  city: z.string({
    required_error: 'Lütfen şehir seçiniz.',
  }),
  month: z.string({
    required_error: 'Lütfen ay seçiniz.',
  }),
});

export type Cities = Array<{ label: string; value: string }>;

export function ComboboxForm() {
  const [cities, setCities] = useState<Cities>([
    { label: 'Adana', value: 'adana' },
    { label: 'Ankara', value: 'ankara' },
    { label: 'Istanbul', value: 'istanbul' },
    { label: 'Izmir', value: 'izmir' },
    { label: 'Antalya', value: 'antalya' },
  ]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  useEffect(() => {
    service
      .get('search/cities')
      .then((res) => {
        setCities(
          res.data.data.cities.map((city: any) => ({
            label: city.city,
            value: city.city.toLowerCase(),
          }))
        );
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const { push } = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    data.month = selectedMonths.join(',');
    push(`/tours?city=${data.city}&month=${data.month}`);
  }

  const months = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ] as const;

  const toggleMonth = (month: string) => {
    if (selectedMonths.includes(month)) {
      setSelectedMonths(selectedMonths.filter((m) => m !== month));
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col md:flex-row items-end justify-center w-full gap-2 py-2 md:py-0 md:gap-8"
      >
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full whitespace-nowrap">
              <FormLabel className="text-lg flex items-center gap-1">
                <LuLocate className="text-cst-primary mr-2" size={24} /> Nereye
                gitmek istersiniz?
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <p className="first-letter:uppercase">
                        {field.value
                          ? cities?.find((city) => city.value === field.value)
                              ?.label
                          : 'Şehir seçiniz...'}
                      </p>
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Şehir ara..."
                      className="h-9 border-none outline-none ring-0 focus:ring-0 focus:outline-none"
                    />
                    <CommandEmpty className="text-muted-foreground">
                      Şehir bulunamadı.
                      <br /> Lütfen başka bir şehir adı giriniz.
                    </CommandEmpty>
                    <CommandGroup>
                      {cities.map((city) => (
                        <CommandItem
                          value={city.label}
                          key={city.value}
                          onSelect={() => {
                            form.setValue('city', city.value);
                          }}
                        >
                          <p className="first-letter:uppercase">{city.label}</p>
                          <CheckIcon
                            className={cn(
                              'ml-auto h-4 w-4',
                              city.value === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="month"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full whitespace-nowrap">
              <FormLabel className="text-lg flex gap-1 items-center">
                <LuCalendar className="text-cst-primary mr-2" size={24} />
                Ne Zaman Gitmek İstersiniz?
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <p className="first-letter:uppercase">
                        {selectedMonths.length > 0
                          ? selectedMonths
                              .map((monthIndex) => months[parseInt(monthIndex)])
                              .join(', ')
                          : 'Ay seçiniz...'}
                      </p>
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="max-w-[380px] md:w-[400px] md:p-5">
                  <FormField
                    control={form.control}
                    name="month"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              form.setValue('month', value);
                            }}
                            defaultValue={selectedMonths[0]}
                            className="grid grid-cols-4 grid-rows-3 md:gap-4"
                          >
                            {months.map((month, i) => (
                              <FormItem key={month + i}>
                                <FormControl>
                                  <RadioGroupItem
                                    value={String(i)}
                                    id={'month-' + i}
                                    className="peer sr-only"
                                    aria-label="company-type"
                                  />
                                </FormControl>
                                <Label
                                  htmlFor={`month-${i}`}
                                  className="flex first-letter:uppercase flex-col aspect-square items-center justify-center rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  onClick={() => toggleMonth(String(i))}
                                >
                                  {month}
                                </Label>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-1/3">
          <SearchIcon className="mr-2 h-5 w-5" />
          <span>Ara</span>
        </Button>
      </form>
    </Form>
  );
}
