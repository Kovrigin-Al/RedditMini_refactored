import { useState, useEffect, ReactNode } from "react";

type Props = {
    children: ReactNode,
    delay: number
}
const useExpire = ({children, delay}:Props) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
      }, delay);
      return () => clearTimeout(timer)
    }, [delay]);
  

    return (visible) 

}
export default useExpire