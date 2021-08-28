import {Router} from "express"
import {UserRoutes} from "./user.route";
import {BlogRoutes} from "./blog.route";

const route=Router()

route.use("/user",UserRoutes);
route.use("/blog",BlogRoutes);

export const MainRouter=route;