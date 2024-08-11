// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_Ciallo: string;//定义提示信息 数据是只读的无法被修改
    //多个变量定义多个...
    VITE_T: string;
    VITE_LC_APP_ID: string;
    VITE_LC_APP_KEY: string;
    VITE_LC_SERVER_URL: string;
    VITE_IMG_FETCH_PREFIX: string;
    VITE_IMG_NAME_PREFIX: string;

}
