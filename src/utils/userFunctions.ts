import * as userRepository from "../repositories/userRepository.js";

export async function userFoundInDatabase(email: string){
    return await userRepository.findUserByEmail(email);
}

export async function userFoundId(id: number){
    return await userRepository.findUserById(id);
}
