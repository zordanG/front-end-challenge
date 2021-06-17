# API to use on front-end challenge

To run this api project you should
1. `npm install`
2. `npm start`

A [JSON-SERVER][1] will be setup, feel free to fork the project and change if you feel confortable to do so, these are the default endpoints:


### Endpoints

|  METHOD | ENDPOINT  | DESCRIPTION  |
| ------------ | ------------ | ------------ |
| GET  |  /documents | get all documents  |
|  POST | /documents  |  create a document |
| GET  |  /documents/:id | get a specific document  |
|  PUT |  /documents/:id |  update a document |
|  DELETE |  /documents/:id | delete a document  |
| GET  |  /processes | get all processes  |
|  POST | /processes  |  create a process |
| GET  |  /processes/:id | get a specific process  |
|  PUT |  /processes/:id |  update a process |
|  DELETE |  /processes/:id | delete a process  |


With Json Server you can [filter][2], [paginate][3] and [sort][4] your queries.


[1]: https://github.com/typicode/json-server "json-server"
[2]: https://github.com/typicode/json-server#filter "json-server filter"
[3]: https://github.com/typicode/json-server#paginate "json-server paginate"
[4]: https://github.com/typicode/json-server#sort "json-server sort"