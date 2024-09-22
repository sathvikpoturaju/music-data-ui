import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from 'axios';
import { setIsArtistLinksFetched, setArtistLinks } from '../features/slice/artistLinksSlice';
import { useSelector, useDispatch } from 'react-redux';
import { SERVER_DOWN_MESSAGE, SERVER_URL, API_SECRET_KEY, ARTIST_LINKS_ID } from "../constants/appConstants";
import { ArtistLinksDTO, LinkDTO, Store } from '../types/type';
import { ImSpinner8 } from 'react-icons/im';

const ArtistLinks: React.FC = (): JSX.Element => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { isArtistLinksFetched, artistLinks } = useSelector( (store: Store) => store.artistLinks);

    const fetchArtistLinksById = async (artistId: string): Promise<void> => {
        try {
            const response: AxiosResponse<ArtistLinksDTO> = await axios.get(
                `${SERVER_URL}/artist-links/get-artist-links/${artistId}`,
                {
                    headers: {
                        'api-secret': API_SECRET_KEY
                    }
                }
            );
            const data: ArtistLinksDTO = response.data;

            dispatch(setIsArtistLinksFetched());
            dispatch(setArtistLinks(data));
        }

        catch (error: any) {
            console.log(error);

            if (error.response) {
                if (error.response.data.errorMessage) {
                    setErrorMessage(error.response.data.errorMessage);
                }
                else {
                    setErrorMessage(error.message);
                }
            }
            else {
                setErrorMessage(SERVER_DOWN_MESSAGE);
            }
        }

        finally {
            setIsLoading(false);
        }
    };

    useEffect( (): void => {
        if (!isArtistLinksFetched && ARTIST_LINKS_ID) {
            setIsLoading(true);
            setErrorMessage('');
            fetchArtistLinksById(ARTIST_LINKS_ID);
        }
    }, []);

    return (
        <div 
            className="w-full min-h-screen sm:pt-8 sm:pb-12 relative"
        >
            {
                isLoading
                ?
                <div className="w-full h-full flex items-center justify-center absolute top-0">
                    <ImSpinner8 
                        size={40}
                        className="animate-spin text-gray-600"
                    />
                </div>
                :
                (
                    isArtistLinksFetched && artistLinks && !errorMessage
                    ?
                    <>
                        <div
                            className="fixed inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: artistLinks ? `url(${artistLinks.profilePictureUrl})` : "",
                                filter: 'blur(40px)',
                                transform: 'scale(1.25)'
                            }}
                        >
                        </div>
                        <div className="w-full sm:max-w-[400px] mx-auto flex flex-col gap-y-4 rounded-md z-10 relative bg-white">
                            <div className="w-full">
                                <div className="w-full min-h-[150px]">
                                    <img 
                                        src={artistLinks.bannerUrl}
                                        className="rounded-t-md w-full object-cover"
                                    />
                                </div>
                                <div className="w-[150px] h-[150px] mx-auto -mt-[35px]">
                                    <img 
                                        src={artistLinks.profilePictureUrl}
                                        className="rounded-full w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-y-1 px-5">
                                <div className="text-2xl font-semibold tracking-wider">
                                    {artistLinks.artistName}
                                </div>
                                <div className="font-light">
                                    {artistLinks.description}
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-3 px-5 pb-8 mt-3">
                                {
                                    artistLinks.links.map( (link: LinkDTO, idx: number): JSX.Element => {
                                        return (
                                            <div 
                                                key={idx}
                                                className="flex flex-row justify-between items-center"
                                            >
                                                <div className="flex flex-row gap-x-3 items-center">
                                                    <div className="w-[50px] h-[50px]">
                                                        <img
                                                            src={link.storeLogoUrl}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                    <div className="text-xl">
                                                        {link.storeName}
                                                    </div>
                                                </div>

                                                <div>
                                                    <a
                                                        href={link.artistUrl}
                                                        target="_blank"
                                                        className="px-4 py-[10px] rounded-full bg-black text-white hover:bg-white hover:text-black transition-all duration-200 border border-black cursor-pointer"
                                                    >
                                                        Visit
                                                    </a>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>
                    :
                    (
                        errorMessage
                        &&
                        <div className="absolute top-0 w-full h-full flex items-center justify-center">
                            <div className="text-2xl text-red-500 font-medium">
                                {errorMessage}
                            </div>
                        </div>
                    )
                )
            }
        </div>
    );
};

export default ArtistLinks;