import { ID, Query } from 'appwrite';
import { account, appwriteConfig, avatars, databases } from './config';

// Create a new user account and save it to the database
export async function createUserAccount(user) {
    console.log(user.name);
    try {
        // Create a new account in Appwrite
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        if (!newAccount) {
            throw new Error('Account creation failed');
        }

        // Generate user avatar using initials
        const avatarUrl = avatars.getInitials(user.name);

        // Save the user to the database
        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        });
        return newUser;
    } catch (error) {
        console.error('Error creating user account:', error);
        return error;
    }
}

// Save the user to the database
export async function saveUserToDB(user) {
    try {
        // Save the user in the Appwrite database
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        );
        return newUser;
    } catch (error) {
        console.error('Error saving user to database:', error);
    }
}

// Sign in a user using their email and password
export async function signInAccount(user) {
    try {
        // Create a session using email and password
        const session = await account.createEmailPasswordSession(user.email, user.password);
        return session;
    } catch (error) {
        console.error('Error signing in user:', error);
    }
}

// Get the current authenticated user
export async function getCurrentUser() {
    try {
        // Get the current account
        const currentAccount = await account.get();

        // If there is no current account, throw an error
        if (!currentAccount) throw new Error('No current account found');

        // Query the user data from the Appwrite database using account ID
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser || currentUser.total === 0) throw new Error('User not found in the database');

        return currentUser.documents[0];
    } catch (error) {
        console.log('Error getting current user:', error);
    }
}


export async function signOutAccount(){
    try{
        const session = await account.deleterSession("current")

        return session;
    }catch(error){
        console.log(error);
    }
}