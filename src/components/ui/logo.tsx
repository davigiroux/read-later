import { Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
  iconClassName?: string
  textClassName?: string
}

const sizeConfig = {
  sm: { icon: 'size-5', text: 'text-base' },
  md: { icon: 'size-7', text: 'text-xl' },
  lg: { icon: 'size-8', text: 'text-2xl' },
}

export function Logo({
  size = 'md',
  showText = true,
  className,
  iconClassName,
  textClassName,
}: LogoProps) {
  const config = sizeConfig[size]

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Layers className={cn(config.icon, 'text-primary', iconClassName)} />
      {showText && (
        <span
          className={cn(
            'font-display font-bold tracking-tight',
            config.text,
            textClassName
          )}
        >
          LaterStack
        </span>
      )}
    </div>
  )
}
