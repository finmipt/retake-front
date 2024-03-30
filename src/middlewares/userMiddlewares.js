// Here I need to check if the user is logged in or not

import {ref} from "vue";
import {getCookie} from "../controllers/cookie.js";
import axios from "axios";
import {BACK_END} from "../../config.js";


async function isAdminMiddleware (to , from , next) {
    try {
        const jwtToken = getCookie('jwt')
        const response = await axios.get(`${BACK_END}/users/user-roles`, {
            headers: {
                'Authorization': `${jwtToken}`
            }
        });
    if (response.data === 'admin') {
        next()
    }
    else {
        const path = response.data
        console.log('path', path)
        next(path)
    }
    }
    catch (error) {
        next('/')  // if the user is not logged in, then he will be redirected to the login page

        console.error('Error with isAdminMiddleware', error);

    }
}
export default isAdminMiddleware