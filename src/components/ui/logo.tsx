import { cn } from '@/lib/utils'

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
        </filter>
      </defs>
      {/* Bottom diamond with rounded corners */}
      <path d="M53 44 L85 62 Q88 64, 85 66 L53 84 Q50 86, 47 84 L15 66 Q12 64, 15 62 L47 44 Q50 42, 53 44 Z" />
      {/* Top diamond with rounded corners and shadow */}
      <path filter="url(#shadow)" d="M53 16 L85 34 Q88 36, 85 38 L53 56 Q50 58, 47 56 L15 38 Q12 36, 15 34 L47 16 Q50 14, 53 16 Z" />
    </svg>
  )
}

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
      <LogoIcon className={cn(config.icon, 'text-primary', iconClassName)} />
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
