export function getContext({ req }){
    return { auth: req.auth }
}