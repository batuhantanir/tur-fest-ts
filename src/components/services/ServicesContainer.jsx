"use client"
import React from 'react'
import { LinkButton } from '@/components/general/Header'
import { twMerge } from 'tailwind-merge'
import { usePathname } from 'next/navigation'

const data = [
    {
        title: 'Hakkımızda',
        content: '',
        href: '/hakkimizda'
    },
    {
        title: 'Hizmetlerimiz',
        content: '',
        href: '/hizmetlerimiz'
    },
    {
        title: 'İletişim',
        content: '',
        href: '/iletisim'
    },
    {
        title: 'Gizlilik Politikası',
        content: '',
        href: '/gizlilik-politikasi'
    },
    {
        title: 'Bilgi Güvenliği Politikası',
        content: '',
        href: '/bilgi-guvenligi-politikasi'
    },
    {
        title: 'Kullanım Sözleşmesi',
        content: '',
        href: '/kullanim-sozlesmesi'
    }
]

const ServicesContainer = ({ children }) => {
    const pathName = usePathname()

    return (
        <div className='md:container md:mx-auto pt-8 pb-12'>
            <div className='md:flex md:container md:mx-auto w-full'>
                <div className='w-1/5 hidden md:block'>
                    {data.map((item, index) => (
                        <LinkButton
                            key={index}
                            className={
                                twMerge(`
                                    rounded-md px-4 py-3 text-left hover:bg-gray-200
                                    ${pathName === item.href ? 'bg-gray-100' : ''}
                                    `)
                            }
                            href={item.href}>{item.title}</LinkButton>
                    ))}
                </div>
                <div className='px-5 md:px-0 md:w-4/5 md:ml-6 '>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default React.memo(ServicesContainer)