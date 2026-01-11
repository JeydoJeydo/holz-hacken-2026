# Holzhacken 2026

## Kronkorks' Crafts
Description ...

### Endpoints
#### Get Templates  
_Get an array with all templates_  

Method: `GET`  
URL: `/backend/v1/templates`

#### Create Template
_Create a template and make it available_

Method: `POST`  
URL: `/backend/v1/templates`  
Body:   
```
{
  "id": "string",
  "name:": "string",
  "size": "int",
  "slotNumber": "int"
}
```

#### Use Pin
_Check if a pin is valid and use it if it is_  

Method: `POST`  
URL: `/backend/v1/use-pin?pin="pin"`  

**Returns:**  
`400` Pin is missing from url  
`404` Pin doesn't exist in database  
`401` Pin exists but is not correct for the device  
`200` Pin exists and was used and deleted afterwards

### Database
#### Connect to database
`sudo mysql -u root -p`
`USE kronkorks;`

### Run project
`source kronkorks-venv/bin/activate`
`python3 server.py`

### Install dependencies
`source kronkorks-venv/bin/activate`
`pip ...`

