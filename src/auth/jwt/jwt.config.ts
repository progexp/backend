export const getJwtConfig = async () => ({
    secret: process.env.JWT_SECRET
});
