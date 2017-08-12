# Ejercicios
Ahora que tenemos nuestro tracker funcionando vamos a simular que ya tenemos 10000 registros en nuestra base de datos y luego ejecutar una serie de operaciones sobre estos datos para validar nuestros conocimientos en mongoDB y node.

##Generar 10000 documentos con la siguiente estructura. Para ello vamos a crear un script por fuera de nuestro server que solamente va a cumplir este proposito.
Lo vamos a llamar generate.js

```
x: Numero random entre 0 y 2048
y: Numero random entre 0 y 1080
target: Opción random de la siguiente lista: 
	* div
	* li
	* a
	* h1
	* font
timestamp: tiempo random entre hoy a las 00:00 y a las 12:59
type: Opción random de la siguiente lista:
	* move
	* click
	* over
	* out
	* null
```

##Crear el endpoint /lastest/:count
Obtiene los ultimos 10 registros agregados con las siguientes condiciones:
Los fields a mostrar son todos menos target
+ Se deben excluir los documentos cuyo type sea null

##Crear un endpoint /delete/:count que borre n documentos generados
##Crear un endpoint /deleteBetween/:start/:end que borre los registros que ocurrieron entre las 21 y las 22.
##Se pide crear un endpoint /report para obtener las siguientes estádisticas
+ Cantidad de interacciones por hora
+ El tipo de evento que más ocurrió
+ Cantidad de clicks en la mitad superior de la pantalla
