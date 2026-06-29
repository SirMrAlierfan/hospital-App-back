import type { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
    origin: (origin, callBack) => {
        const allowOrigin = ["localhost:5173"]
        if (!origin || allowOrigin.indexOf(origin) !== -1) {
            callBack(null, true)
        } else {
            callBack(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
    maxAge: 3600
}