export const isAuth = () => {
    if (typeof window !== "undefined") {
        return !!localStorage.getItem("user");
        
    }
}
