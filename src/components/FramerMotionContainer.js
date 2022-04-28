import { motion } from 'framer-motion';

export default function FramerMotionContainer({ children }) {
  return (
    <motion.div animate={{ opacity: 1, fontSize: 50 }} initial={{ opacity: 0 }}>
      {children}
    </motion.div>
  );
}
