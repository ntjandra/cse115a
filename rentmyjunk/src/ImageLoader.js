/*************************************************************
 * ImageLoader.js
 * 
 * Import 'images' to have access to images for use in webpage
 * 
 * TODO: see if there is a more efficient way of doing this
 *************************************************************/

/**
 * Image importing
 */

// Logos
import desktop_logo from './images/logos/logo_lowres_text.png';
import mobile_logo from './images/logos/logo_lowres.png';

// Icons
import home from './images/icons/home.png'
import create_post from './images/icons/new-file.png'
import arrow from './images/icons/next-page.png'
import about_us from './images/icons/open-book.png'
import search from './images/icons/search.png'
import profile from './images/icons/user.png'

/**
 * Dictionary of images
 */
const images = {
    // Logos
    "desktop_logo" : desktop_logo,
    "mobile_logo" : mobile_logo,

    // Icons
    "home" : home,
    "create_post" : create_post,
    "arrow" : arrow,
    "about_us" : about_us,
    "search" : search,
    "profile" : profile
};

export default images;
