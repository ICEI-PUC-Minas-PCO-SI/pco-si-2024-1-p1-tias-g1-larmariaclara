const knex = require('knex');
require('dotenv').config();

const fs = require('fs')
const config = fs.readFileSync(process.env.PROJECT_PATH + '/config.json', 'utf-8')
const configApp = JSON.parse(config)

const db = knex(configApp.config);

module.exports.db = db
module.exports.configApp = configApp

module.exports.excreateTable = async function(tableName, columnsName){
	try {
		const exists = await db.schema.hasTable(tableName);
		if (exists) {
			await db.schema.dropTable(tableName);
			console.log(`Table "${tableName}" successfully deleted.`);
		}

		const columns = columnsName.split('\n').map((column) => column.trim() + ' TEXT,');
		const columnsQuery = columns.join('').slice(0, -1);

		await db.raw(`
		CREATE TABLE ${tableName} (
			id INT PRIMARY KEY AUTO_INCREMENT,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			ownid TEXT,
			updated_hash TEXT,
			delete_row TEXT,
			${columnsQuery}
		)`);

		console.log(`Table "${tableName}" successfully created.`);
	} catch (error) {
		
	}
}
  
