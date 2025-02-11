// components/legal/content-section.tsx
export function ContentSection({ children }: { children: React.ReactNode }) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg text-gray-600">
          {children}
        </div>
      </section>
    );
  }