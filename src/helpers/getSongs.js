import { songs } from '../data/songs.js';

export const getSongs = ( id ) => {
    const song = songs[id];
    return song;
}