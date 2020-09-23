## Kubernetes Pod memory pressure example

When trying out this code on mongodb console to bulk load some test data in mongodb, ~10 million rows

```javascript
x=[]
for (var i = 0; i < 10000000; i++) {
   x.push({insertOne:{"document":{"title" : "The Arrival of a Train","description":"Just some test data to load so that we can test the large size data load for mongodb, plus keep appending more bytes with no purpose of this info",
                                  "meta":{"labels":["john","doe"]}
                                 }
                     }
         })
}
```

Machine Spec:
GKE: e2-medium (2 vCPUs, 4 GB memory)

The Pod simply blows up (Evicted) due to memory pressure, Needed to reduce it to 1 million

### Document Size
Turns out that above document i was using has following size estimates
```
Object.bsonsize(db.testone.findOne())
268
```
268 bytes
> 1 million doc size in MB = 268 *  1000000 / ( 1024 * 1024 ) ~  256 MB (Occasional Crash).  
> 10 million doc size in MB = 268 * 10000000 / ( 1024 * 1024 ) ~ 2556 MB (Confirmed Crash) = 2.5 GB Memory.
