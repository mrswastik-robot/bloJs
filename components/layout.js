import Nav from "./Nav";
import Providers from "./providers";

export default function Layout({children})
{
    return(
        <Providers>
         <div className="mx-6 md:max-w-2xl md:mx-auto font-poppins">
            <Nav />
            <main>{children}</main>
         </div>
        </Providers>


       

    );


}