//Copyright TAMPO 
// Author : Lucas DEROUIN

import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class UserPermissions {
    getCameraPermission = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            if (status != "granted") {
                alert("Autorisez-vous que Tampo accède à votre galerie ?")
            }
        }
    }
}

export default new UserPermissions();