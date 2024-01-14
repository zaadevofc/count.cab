import { motion } from "framer-motion";
import Navbar from '~/components/Navbar';
import Sidebar from '~/components/Sidebar';

const Layout = (props: any) => {
  return (
    <>
      <div className='text-gray-500 min-h-screen justify-between flex mx-auto md:max-w-7xl lg:container'>
        <Sidebar />
        <div className='flex flex-col px-5 lg:px-10 py-5 w-full mb-20 lg:mb-0'>
          <Navbar title={props.title} />
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            {props.children}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Layout