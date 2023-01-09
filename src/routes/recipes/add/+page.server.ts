import type { RequestEvent } from "../$types";

export const post = async ({request}: RequestEvent) => {
    const data = await request.formData()
    console.table(["hej"])
    // console.table([...data.entries()])
    return {
        headers: { Location: '/' },
        status: 302
    }
}

// /** @type {import('./$types').Actions} */
// export const actions: import('./$types').Actions = {
//     default: async (event: object) => {
//         console.table(event)
//     }
//   };