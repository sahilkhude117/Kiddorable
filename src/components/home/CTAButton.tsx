'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const CTAButton = () => {
    const router = useRouter();
    return <>
        <div
          className="flex flex-row gap-4 justify-center mb-8 opacity-0 animate-fade-in-up delay-400"
        >
          <Button
            className="relative overflow-hidden group px-8 py-6 text-lg
                       bg-gradient-to-r from-[#FFD700] to-[#FFB700] hover:from-[#FFB700] hover:to-[#FF9500]
                       text-[#2A5C8F] shadow-lg hover:shadow-xl transition-all"
            size="lg"
            onClick={()=>{
                router.push('/products');
            }}
          >
            <div className="relative z-10">Start Learning Now</div>
            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all" />
          </Button>
        </div>
    </>
}