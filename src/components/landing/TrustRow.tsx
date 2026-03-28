import enuLogo from '@/assets/logos/enu.png';
import kbtuLogo from '@/assets/logos/kbtu.png';
import nuLogo from '@/assets/logos/nu.png';
import kimepLogo from '@/assets/logos/kimep.png';
import aituLogo from '@/assets/logos/aitu.png';
import mnuLogo from '@/assets/logos/mnu.png';

export function TrustRow() {
    const universities = [
        { name: "ENU", logo: enuLogo },
        { name: "KBTU", logo: kbtuLogo },
        { name: "NU", logo: nuLogo },
        { name: "KIMEP", logo: kimepLogo },
        { name: "AITU", logo: aituLogo },
        { name: "MNU", logo: mnuLogo },
    ];

    return (
        <section className="relative z-10 overflow-hidden border-y border-white/5 bg-transparent py-16">
            <div className="container mx-auto px-4 text-center mb-10">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400 md:text-base">
                    Trusted by students at
                </p>
            </div>

            <div className="relative w-full overflow-hidden mask-edge-fade">
                <div className="flex w-max animate-marquee items-center">
                    {/* First set of logos */}
                    <div className="flex items-center gap-16 mx-8">
                        {universities.map((uni) => (
                            <div
                                key={`1-${uni.name}`}
                                className="flex items-center justify-center h-20 transition-transform duration-300 hover:scale-105"
                            >
                                <img
                                    src={uni.logo}
                                    alt={`${uni.name} Logo`}
                                    className="h-full w-auto object-contain max-w-[180px] grayscale opacity-60 mix-blend-lighten"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Duplicate set for infinite scroll effect */}
                    <div className="flex items-center gap-16 mx-8">
                        {universities.map((uni) => (
                            <div
                                key={`2-${uni.name}`}
                                className="flex items-center justify-center h-20 transition-transform duration-300 hover:scale-105"
                            >
                                <img
                                    src={uni.logo}
                                    alt={`${uni.name} Logo`}
                                    className="h-full w-auto object-contain max-w-[180px] grayscale opacity-60 mix-blend-lighten"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Triplicate set to ensure smooth looping on very wide screens */}
                    <div className="flex items-center gap-16 mx-8">
                        {universities.map((uni) => (
                            <div
                                key={`3-${uni.name}`}
                                className="flex items-center justify-center h-20 transition-transform duration-300 hover:scale-105"
                            >
                                <img
                                    src={uni.logo}
                                    alt={`${uni.name} Logo`}
                                    className="h-full w-auto object-contain max-w-[180px] grayscale opacity-60 mix-blend-lighten"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Quadruplicate set to safe guard */}
                    <div className="flex items-center gap-16 mx-8">
                        {universities.map((uni) => (
                            <div
                                key={`4-${uni.name}`}
                                className="flex items-center justify-center h-20 transition-transform duration-300 hover:scale-105"
                            >
                                <img
                                    src={uni.logo}
                                    alt={`${uni.name} Logo`}
                                    className="h-full w-auto object-contain max-w-[180px] grayscale opacity-60 mix-blend-lighten"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
