
# NEXT JS - JIRA

## PARA CORRER LOCALMENTE SE NECESITA LA BASE DE DATOS:

* Abrir docker desktop
* Y en su consola agregar:

```
docker-compose up -d
```

El -d, significa __detached__



## MONGO COMPOSSE DB URL LOCAL:

* Ingresar en mongo composse y conectarse con la url:

```
mongodb://localhost:27017/entriesdb
```


## CONFIGURAR LAS VARIABLES DE ENTORNO:

Renombrar el archivo __.env.template__ a : __.env__



## RECONSTRUIR LOS MODULOS DE NODE Y LEVANTAR NEXT:

``` 
npm install 
npm run dev
```


## LLENAR LA BASE DE DATOS CON INFORMACIÓN DE PRUEBA:

```
http://localhost:3000/api/seed
```