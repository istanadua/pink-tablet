import { IncomingMessage } from 'http';

/**
 * Handles incoming requests.
 *
 * @param {{ request: IncomingMessage }} context - The context object containing the incoming request.
 */
export async function onRequest({request}) {
    const url = new URL(request.url, 'http://localhost')
    const res = await fetch(`https://donet.co/poll/${url.searchParams.get('id')}`)
    const new_res = new Response(await res.bytes())

    const excludes = [
        'x-frame-options',
        'content-encoding',
        'content-security-policy',
    ]

    for (const [name, value] of res.headers) {
        if (excludes.includes(name))
            continue
        new_res.headers.set(name, value)
    }

    return new_res
}
