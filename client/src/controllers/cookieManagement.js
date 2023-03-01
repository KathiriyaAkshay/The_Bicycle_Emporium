const getCookie = (cookie_name) => {
    const re = new RegExp(`(?<=${cookie_name}=)[^;]*`);
    try {
        return document.cookie.match(re)[0];	// Will raise TypeError if cookie is not found
    } catch {
        return "NOTEXIST";
    }
}
export default getCookie;