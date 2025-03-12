import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const MainDB = 'mongodb+srv://xanensismo:eIB3SDhf6z1YMqq4@cluster0.6gshj.mongodb.net/TeamProject?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MainDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		autoIndex: true, // helpes to get rid of unique property problem in mongoose schema
		useCreateIndex: true,
	})
	.then(() => console.log(`Main Database connected successfully`))
	.catch((err) => console.log(err));

	const db ='mongodb+srv://xanensismo:eIB3SDhf6z1YMqq4@cluster0.6gshj.mongodb.net/TeamProject?retryWrites=true&w=majority&appName=Cluster0'
	
	mongoose.connect(db,  {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	}).then(() => console.log('MongoDB Connected....'))
	.catch(err => console.log(err));
