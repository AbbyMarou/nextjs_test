'use client'
import { useEffect, useState } from "react"
import { Header } from "./Header"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

interface Image {
    id: string;
    urls: {
        small: string;
    };
    slug: string; // Assurez-vous que la propriété slug est correcte
}


export const Accueil =() =>{
    const[images , setImages] =useState<Image[]>([]);
    const [load, setLoad] = useState(true);
    const [searchRes , setSearchRes] = useState<Image[]>([])
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        console.log('eto');
        const fetchImg = async () =>{
            try{
                const response = await fetch('https://api.unsplash.com/photos/?client_id=OlZLH3b-qpAnxSsfBKd75_w6eQpiq3Ni0tgdTISgBcw&per_page=36');
                const data = await response.json();
                setImages(data);
               console.log(data);
               setLoad(false);
                
            }catch(error){
                console.error('Erreur sur la recuperation des images', error)
            }

        }
        fetchImg();
    }, [])

    const handleSearch = (searchQuery: string) =>{
        console.log('etoua' , searchQuery);
        if(searchQuery === ''){
            //reset
            setSearchRes([]);
            setShowPopup(false);
        }else{
            //filtrer resultats
            console.log('etoua 2',images)
            const results = images.filter((image) =>
                
                image.slug.toLowerCase().includes(searchQuery.toLowerCase())
            )
            if(results.length===0){
                setShowPopup(true);
            }else{
                
                setSearchRes(results)
            }
            
            
        }
    }
    

    return(
        <>
            <Header onSearch={handleSearch}/>
            {showPopup && (
                    <div className="popup absolute">
                        <p>Aucun résultat trouvé.</p>
                    </div>
                )}
            <div className="explore">
                <div className="lefta">
                    <span className="more">More to explore :</span>
                </div>
                <div className="righta">
                    <span className="bordered  linka">The Suit</span>
                    <span className="bordered linka">Suit 16</span>
                    <span className="bordered linka">The Suite Life of Zack & Cody</span>
                    <span className="bordered linka">The Suite Life Movie</span>
                    <span className="bordered linka">Suits on the Loose</span>
                    <span className="bordered linka">The Suite Life on Deck</span>
                    <span className="bordered linka">Executive Suite</span>
                    <span className="bordered linka">The Horse in the Gray Flannel Suit</span>
                    <span className="bordered linka fin">Bach: Orchestral Suites: Amsterdam Baroque Orchestra</span>
                </div>
                

                
            </div>

            <div className="carts">
                {load?(
                     Array.from({ length: 18 }).map((_, index) => (
                        <div key={index} className="">
                            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                <Skeleton  height={160} width={260} count={1} />
                            </SkeletonTheme>
                        </div>
                      ))
                    
                    
                ):searchRes.length>0 ? (
                    searchRes.map((image)=> (
                        <div key={image.id} style={{backgroundImage:`url(${image.urls.small})`}} className="carda"></div>
                ))):
                
                (
                    images.map((image)=> (
                        <div key={image.id} style={{backgroundImage:`url(${image.urls.small})`}} className="carda"></div>
                )))

                }
            </div>
        </>
    )
        
  
}