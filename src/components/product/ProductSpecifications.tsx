interface ProductSpecificationsProps {
  specifications: { [key: string]: string };
}

export default function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  const specKeys = Object.keys(specifications);

  if (specKeys.length === 0) return null;

  return (
    <div className="mt-10 border-t border-brand-border pt-10">
      <h3 className="font-caveat font-medium text-text-fg text-sm tracking-wide uppercase mb-6">
        Technical Specifications
      </h3>
      
      <div className="bg-brand-muted-bg rounded-primary border border-brand-border overflow-hidden">
        <dl className="divide-y divide-brand-border">
          {specKeys.map((key) => (
            <div 
              key={key} 
              className="grid grid-cols-1 sm:grid-cols-3 px-6 py-4 gap-2 sm:gap-6 text-sm"
            >
              <dt className="font-matter font-semibold text-text-fg">
                {key}
              </dt>
              <dd className="font-matter text-xs text-text-muted sm:col-span-2">
                {specifications[key]}
              </dd>
            </div>
          ))}
        </dl>
      </div>

    </div>
  );
}
