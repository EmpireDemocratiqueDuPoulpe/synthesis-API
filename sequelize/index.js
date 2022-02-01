
import { DataTypes } from "sequelize";

import User from "./models/user.js";
import Enterprise from "./models/enterprise.js";
import { sequelize } from "../api/middlewares/database.js";


export default {
	sequelize,
	models: {
		user,
		enterprise,
	},
};
