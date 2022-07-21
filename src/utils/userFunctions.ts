import * as userRepository from "../repositories/userRepository.js";

export async function userFoundInDatabase(email: string){
    return await userRepository.findUserByEmail(email);
}
