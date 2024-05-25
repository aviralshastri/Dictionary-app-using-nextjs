import {motion} from "framer-motion"
import AdSense from "./AdSense"
export default function Page({children, duration}){
    return(
        <>
        <head>
            <AdSense />
        </head>
        <motion.main 
        initial={{y:20, opacity:0}}
        animate={{y:0, opacity:1}}
        transition={{ease:'easeOut', duration: duration,}}>{children}</motion.main>
        </>
    )
}