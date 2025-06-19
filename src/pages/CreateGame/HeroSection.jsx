import { motion } from "framer-motion";


const HeroSection = () => {
    return (
        <section className="h-screen bg-gradient-to-r from-red-900 to-black flex xl:flex-row 
    flex-col-reverse items-center justify-between lg:px-24 px-10 relative overflow-hidden">

            <div classname="z-40 xl:mb-0 mb-[20%]">
                <motion.h1
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 40,
                        damping: 25,
                        delay: 1.3,
                        duration: 1.5,
                    }}
                    className="text-5xl md:text-7xl
                lg:text-8xl font-bold z-10 mb-6">
                    Table Football Tournaments
                    <br /> Manage Efficiently
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 40,
                        damping: 25,
                        delay: 1.8,
                        duration: 1.5,
                    }}
                    className="text-xl md:text-1xl
                lg:text-2xl text-purple-200 max-w-2xl">
                    With Kickr, companies can easily manage their foosball tournaments – register teams,
                    record results, view rankings, and organize tournaments flexibly.
                </motion.p>
            </div>



        </section>
    )
}

export default HeroSection