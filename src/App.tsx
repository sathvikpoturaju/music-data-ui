import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArtistLinks from "./components/ArtistLinks";
import AlbumLinks from "./components/AlbumLinks";
import NotFound from "./components/NotFound";

const App: React.FC = (): JSX.Element => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route
                        path = '/'
                        element = {<ArtistLinks />}
                    />
                    <Route 
                        path = '/album/:id'
                        element = {<AlbumLinks />}
                    />
                    <Route
                        path = '*'
                        element = {<NotFound />}
                    />
                </Routes>
            </Router>
        </div>
    );
};

export default App;