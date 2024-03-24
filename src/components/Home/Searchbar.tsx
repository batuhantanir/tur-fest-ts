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
  FormDescription,
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
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Building2Icon, GlobeIcon, SearchIcon, UserIcon } from 'lucide-react';
import { LuCalendar, LuLocate } from 'react-icons/lu';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { useEffect, useState } from 'react';
import service from '@/lib/axios';
import { useMediaQuery } from '@/lib/useMediaQuery';

export default function Component() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <>
      {!isMobile ? (
        <div className="flex justify-center relative w-full h-fit mt-[75px] md:mt-0 md:h-[800px]">
          <div
            className="relative w-full flex items-center justify-start h-full"
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url(/tourheader.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="w-full md:container md:mx-auto">
              <Card className="md:max-w-[568px] md:rounded-lg rounded-none md:border border-0 w-full">
                <CardContent className="p-6">
                  <ComboboxForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center relative w-full h-fit mt-[75px] md:mt-0 md:h-[800px]">
            <div className="w-full md:container md:mx-auto">
              <Card className="md:max-w-[568px] md:rounded-lg rounded-none md:border border-0 w-full">
                <CardContent className="p-6">
                  <ComboboxForm />
                </CardContent>
              </Card>
            </div>
          </div>
      )}
    </>
  );
}

// const cities = [
//   { label: 'Adana', value: 'adana' },
//   { label: 'Ankara', value: 'ankara' },
//   { label: 'Istanbul', value: 'istanbul' },
//   { label: 'Izmir', value: 'izmir' },
//   { label: 'Antalya', value: 'antalya' },
//   // Add more cities here
// ] as const;

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
  // console.log(cities);
  const { push } = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex flex-col">
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
                      {field.value
                        ? cities?.find((city) => city.value === field.value)
                            ?.label
                        : 'Şehir seçiniz...'}
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
                          {city.label}
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
            <FormItem className="flex flex-col">
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
                      {field.value
                        ? months[Number(field.value)]
                        : 'Ay seçiniz...'}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-5">
                  <FormField
                    control={form.control}
                    name="month"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-4 grid-rows-3 gap-4"
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
                                  className="flex flex-col aspect-square items-center justify-center rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
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
        <Button type="submit" className="w-full">
          <SearchIcon className="mr-2 h-5 w-5" />
          <span>Ara</span>
        </Button>
      </form>
    </Form>
  );
}
