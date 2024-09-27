import {Client, Account, Databases, Storage, Avatars} from 'appwrite';

export const appwriteConfig={
    // WE MADE A '.env.local' file save the key because we don't want anyone to see it and we don't want to share it.
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,  
    url: import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId:import.meta.env.VITE_APPWRITE_STORAGE_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
}

export const client=new Client();

client.setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectId);

export const account=new Account(client);
export const databases =new Databases(client);
export const storage =new Storage(client);
export const avatars =new Avatars(client);