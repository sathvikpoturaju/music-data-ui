import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { setAlbumLinks, setIsAlbumLinksFetched } from '../features/slice/albumLinksSlice';
import { useSelector, useDispatch } from 'react-redux';
import { SERVER_DOWN_MESSAGE, SERVER_URL, API_SECRET_KEY } from "../constants/appConstants";
import { AlbumLinksDTO, LinkDTO, Store } from '../types/type';
import { ImSpinner8 } from 'react-icons/im';

const AlbumLinks: React.FC = (): JSX.Element => {
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { isAlbumLinksFetched, albumLinks } = useSelector( (store: Store) => store.albumLinks);

    const fetchAlbumLinksById = async (albumId: string): Promise<void> => {
        try {
            const response: AxiosResponse<AlbumLinksDTO> = await axios.get(
                `${SERVER_URL}/album-links/get-album-links-for-song/${albumId}`,
                {
                    headers: {
                        'api-secret': API_SECRET_KEY
                    }
                }
            );
            const data: AlbumLinksDTO = response.data;

            dispatch(setIsAlbumLinksFetched());
            dispatch(setAlbumLinks(data));
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
    }

    useEffect( (): void => {
        if (!isAlbumLinksFetched && id) {
            setIsLoading(true);
            setErrorMessage('');
            fetchAlbumLinksById(id);
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
                    isAlbumLinksFetched && albumLinks && !errorMessage
                    ?
                    <>
                        <div
                            className="fixed inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: albumLinks ? `url(${albumLinks.coverArtUrl})` : "",
                                filter: 'blur(40px)',
                                transform: 'scale(1.25)'
                            }}
                        >
                        </div>
                        <div className="w-full sm:max-w-[400px] mx-auto flex flex-col gap-y-6 rounded-md z-10 relative bg-white">
                            <div className="w-full min-h-[150px]">
                                <img 
                                    src={albumLinks.coverArtUrl}
                                    className="rounded-t-md w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-y-[6px] px-5">
                                <div className="text-2xl font-semibold tracking-wider leading-10">
                                    {albumLinks.albumName}
                                </div>
                                <div>
                                    <span className="font-extralight">by</span>
                                    <span className="font-medium pl-[5px]">{albumLinks.artistName}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-3 px-5 pb-8">
                                {
                                    albumLinks.links.map( (link: LinkDTO, idx: number): JSX.Element => {
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
                                                        href={link.albumUrl}
                                                        target="_blank"
                                                        className="px-4 py-[10px] rounded-full bg-black text-white hover:bg-white hover:text-black transition-all duration-200 border border-black cursor-pointer"
                                                    >
                                                        Listen
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

export default AlbumLinks;