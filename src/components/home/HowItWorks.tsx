export function HowItWorks() {
    const steps = [
      {
        title: "Choose Your Kit",
        description: "Browse age-appropriate learning materials",
        icon: "📚"
      },
      {
        title: "Instant Download",
        description: "Get PDFs immediately after payment",
        icon: "⏬"
      },
      {
        title: "Learn & Grow",
        description: "Print and start the fun learning journey",
        icon: "🚀"
      }
    ]
  
    return (
      <div className="px-4 mt-12 mb-12">
        <h2 className="text-2xl font-bold text-[#2A5C8F] mb-8 text-center">
          How It Works
        </h2>
        
        <div className="space-y-8 ">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center text-2xl mb-4">
                {step.icon}
              </div>
              <h3 className="font-bold text-[#2A5C8F] mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm max-w-[200px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }