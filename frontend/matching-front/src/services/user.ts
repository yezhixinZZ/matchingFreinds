import myAxios from "../plugins/myAxios.ts";
import {setCurrentUserState} from "../states/user.ts";

export const getCurrentUser = async () => {
/*    const currentUser = getCurrentUserState();
    if (currentUser) {
        return currentUser;
    }*/
    const res = await myAxios.get('user/current');
        if (res.code === 0){
            setCurrentUserState(res.data);
            return res.data;
        }
        return null;
}

