import {motion} from "framer-motion"

export default function Page({children, duration}){
    return(
        <>
        <motion.main 
        initial={{y:20, opacity:0}}
        animate={{y:0, opacity:1}}
        transition={{ease:'easeOut', duration: duration,}}>{children}</motion.main>
        </>
    )
}