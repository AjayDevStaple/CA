import Lottie from "react-lottie";
import animation from "../../assets/loader.json";



 const Loader = () => { 
     const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData : animation,
        rendererSettings: {
           preserveAspectRatio: "xMidYMid slice",
        },
     };
         return (
        <>
        <div style={{marginTop : '250px', marginLeft: '300px'}}>
 <Lottie options={defaultOptions} height={300} width={300}  />
        </div>
           
             </>
       
     )
   
}

export default Loader;

