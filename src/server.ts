import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const port = +process.env.PORT || 4000;
app.listen(port, ()=> {
    console.log(chalk.green(`Server is running on port ${port}`));
});
//
