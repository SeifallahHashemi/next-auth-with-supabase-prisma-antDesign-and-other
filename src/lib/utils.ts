import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes))

export const delayFn = (delay: number = 1500) => {
    return new Promise((resolve) => setTimeout(resolve, delay))
}