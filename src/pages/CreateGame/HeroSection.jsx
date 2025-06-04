import { motion } from "framer-motion";


const HeroSection= () => {
  return (
    <section className="h-screen bg-gradient-to-r from-red-900 to-black flex xl:flex-row 
    flex-col-reverse items-center justify-between lg:px-24 px-10 relative overflow-hidden">

        <div classname="z-40 xl:mb-0 mb-[20%]">
            <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type:"spring",
                stiffness: 40,
                damping: 25,
                delay: 1.3,
                duration: 1.5,
            }}
                className="text-5xl md:text-7xl
                lg:text-8xl font-bold z-10 mb-6">
                Tischkicker Turniere <br /> Effizient 
                Verwalten
            </motion.h1>

            <motion.p
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type:"spring",
                stiffness: 40,
                damping: 25,
                delay: 1.8,
                duration: 1.5,
            }}
                className="text-xl md:text-1xl
                lg:text-2xl text-purple-200 max-w-2xl">
                Mit Kickr behalten Unternehmen den Überblick über ihre Kickerturniere - Teams eintragen, 
                Ergebnisse erfassen, Rankings sehen und Turniere flexibel gestalten.
            </motion.p>
        </div>

        
        
    </section>
  )
}

export default HeroSection