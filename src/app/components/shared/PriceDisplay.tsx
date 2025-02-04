export function PriceDisplay({
    price,
    className
  }: {
    price: number
    className?: string
  }) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-lg font-bold">${price}</span>
        {price > 15 && (
          <span className="text-sm line-through text-gray-400">
            ${Math.round(price * 1.2)}
          </span>
        )}
      </div>
    )
  }