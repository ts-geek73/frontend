'use client' 
import Image, { StaticImageData} from "next/image";
import cloresal1  from './../../public/images/cloresal1.png'
import cloresal2  from './../../public/images/cloresal2.png'
import cloresal3  from './../../public/images/cloresal3.png'

const Cloresal = () => {
    const images: Array<StaticImageData> = [cloresal1, cloresal2, cloresal3,
        cloresal1, cloresal2, cloresal3
        ,cloresal1, cloresal2, cloresal3]
    
    return (
        <>

        <div className="flex overflow-hidden space-x-16 gap-3">

            <div className="flex p-9 animate-wiggle space-x-16 gap-3">
                {
                    
                        images.map((image:StaticImageData, index:number) => (
                        <Image
                            key={index}
                            src={image}
                            height={700}
                            width={7500}
                            alt={`cloresal-${index} Image`}
                            className="m-4 rounded-lg"
                        />
                    ))
                }
                
            </div>
        </div>
        
        </>
    );
}

export default Cloresal;    