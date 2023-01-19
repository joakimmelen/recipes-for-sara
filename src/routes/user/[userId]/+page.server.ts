import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

/** @type {import('./$types').PageServerLoad} */

export async function load({params} : {params: string}) {

    const fetchUser = async (userId: string) => {
        console.log(userId)
        const record = await pb.collection('users').getOne(`${userId}`, {});
        return record
    }

    console.log(params)


 }

