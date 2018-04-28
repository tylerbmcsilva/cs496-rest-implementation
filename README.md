## Boats & Slips

### To Start
1. Run `npm install`
2. Run `npm start`
3. All local endpoints will be at `localhost:8080/`

### To use live version:
Base endpoint is: `https://restimplementation-202104.appspot.com`

### Endpoints
#### Boat
* **GET /boat** - Return array of all boats
* **POST /boat** - Creates a new boat
* **GET /boat/{boatid}** - Returns information about a specific boat id
* **PATCH /boat/{boatid}** - Updates a specific boat by id (must include all attributes)
* **DELETE /boat/{boatid}** - Deletes a specific boat by id (will also update slips)
* **PUT /boat/{boatid}/arrive** - Sets a boat to be docked, auto supplies a slip
* **PUT /boat/{boatid}/arrive/{slipid}** -  Sets a boat to be docked to a specific slip, will return unauthorized if slip is taken
* **PUT /boat/{boatid}/depart** - Undocks a boat

#### Slip
* **GET /slip** - Return array of all slips
* **POST /slip** - Creates a new slip
* **GET /slip/{slipid}** - Returns information about a specific slip by id
* **PATCH /slip/{slipid}** - Updates a specific slip by id
* **DELETE /slip/{slipid}** - Deletes a specific slip by id

### Schemas
#### Boat
```
{
  "name": "Sea Witch", #The name of the boat, a string
  "type":"Catamaran", #The type of boat, power boat, sailboat, catamaran etc. a string
  "length":28, #The length of the boat
  "at_sea":false #A boolean indicating if the boat is at sea or not
}
```

#### Slip
```
{
  "number": 5, #The the slip number, essentially the human understandable identifier
  "current_boat":"abc555",  #The id of the current boat, null if empty
  "arrival_date":"1/1/2015", #A string indicating the date the boat arrived in the slip
  "departure_history":[{"departure_date":"11/4/2014","departed_boat":"123aaa"}...]
}
```
