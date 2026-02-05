import App from "./components/App";
import Valentines from "./components/Valentines";
import { Error404 } from "./components/Error404";
import { AnimatePresence, motion } from "motion/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Define animation variants for page transitions
const animVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.5 } },
};


const RouteList = () => {
    const location = useLocation(); // Get the current location

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route 
                    path="i-love-you/:name/wanna-be-my-valentine"
                    element={
                        <motion.div variants={animVariants} initial="initial" animate="animate" exit="exit">
                            <App />
                        </motion.div>
                    }
                />

                <Route 
                    path="hey-there/:name/do-u-wanna-be-my-valentine"
                    element={
                        <motion.div variants={animVariants} initial="initial" animate="animate" exit="exit">
                            <Valentines />
                        </motion.div>
                    }
                />

                {/* 404 for undefined routes */}
                <Route
                    path="*"
                    element={
                        <motion.div variants={animVariants} initial="initial" animate="animate" exit="exit">
                            <Error404 />
                        </motion.div>
                    }
                />
            </Routes>
        </AnimatePresence>
    )
}

export const Router = () => {
    return (
        <BrowserRouter>
            <RouteList />
        </BrowserRouter>
    )
}