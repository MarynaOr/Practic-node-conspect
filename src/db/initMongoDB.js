import mongoose from 'mongoose';
import { getEnvVar } from '../module-2/lesson-1/utils/getEnvVar.js';
import { ENV_VARS } from '../module-2/lesson-1/constants/constants.js';

export const initMongoDB = async () => {
  const user = getEnvVar(ENV_VARS.MONGO_DB_USER);
  const pwd = getEnvVar(
    ENV_VARS.MONGO_DB_PASSWORD,
  );
  const url = getEnvVar(ENV_VARS.MONGO_DB_HOST);
  const db = getEnvVar(
    ENV_VARS.MONGO_DB_DATABASE,
  );
  const uri = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Maryna`;
  //  maryna.coyslct.mongodb.net/

  try {
    await mongoose.connect(uri);
    await mongoose.connection.db.command({
      ping: 1,
    });
    // const user = getEnvVar('MONGODB_USER');
    // const pwd = getEnvVar('MONGODB_PASSWORD');
    // const url = getEnvVar('MONGODB_URL');
    // const db = getEnvVar('MONGODB_DB');

    // await mongoose.connect(
    // `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Maryna`,
    // `mongodb+srv://${user}:${encodeURIComponent(
    //   pwd,
    // )}@${url}/${db}?retryWrites=true&w=majority&appName=Maryna`,
    // );

    console.log(
      'Mongo connection successfully established!',
    );
  } catch (error) {
    console.log(
      'Error while setting up mongo connection',
      error,
    );
    throw error;
  }
};

// const uri =
//   'mongodb+srv://Maryna:<db_password>@maryna.coyslct.mongodb.net/?retryWrites=true&w=majority&appName=Maryna';
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 });
//     console.log(
//       'Pinged your deployment. You successfully connected to MongoDB!',
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
