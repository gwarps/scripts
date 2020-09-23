/**
 * Load test data into mongodb
 * collection.insert takes a lot of time
 * this makes use of bulkwrite to do it faster
 * 
 * Note that this script was executed on mongodb cli console
 */

x = []
for (var i = 0; i < 1000000; i++) {x.push({insertOne:{"document":{"title" : "The Arrival of a Train"}}})}

// You cannot re-execute this alone, as all rows have _id's set. You need to 
// execute both of all of these statements to load more data
db.testone.bulkWrite(x);
