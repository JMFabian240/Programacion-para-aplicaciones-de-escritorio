# **Programacion para aplicaciones de escritorio.**

***Este repositorio constituye el portafolio de evidencias para la EE(Experiencia Educativa): Programación para 
Aplicaciones de Escritorio. Facultad de Administracion y Contaduria-Universidad Veracruzana. Perido FEB-JUN 2026, 
donde se documenta el desarrollo de soluciones de software robustas y multiplataforma. Las actidades estan implementadas 
en java para e manejo de excepciones y para las aplicaicones de escritorio se estan implementando en Electron. ***


## **Contenido**


### Java

### **[Activadad 1](./Actividad_1)**  

Se requiere calcular el porcentaje de votos que están en una urna. Cada que se saca un boto de la urna, se ingresa el 
número del candidato. Cuando se terminan los votos se ingresa un cero.

### **[Entradas y salidas](./Entradas%20y%20salidas)**

Colección de ejercicios sobre manejo de flujos de E/S en Java:

- **CopyBytes / CopyCharacters** – Copia de archivos byte a byte y carácter a carácter.
- **EscribeMatriz / LeeMatriz** – Escritura y lectura de matrices usando BufferedStream, DataStream, FileWriter y ObjectStream.
- **App** – Copia de un archivo de texto (MisdatosUV.txt) usando FileInputStream / FileOutputStream.

### **[Excepciones](./Exceptions)**

Introducción al manejo de excepciones en Java:

- **CalcAverage** – Cálculo de promedio sin manejo de errores (división por cero intencional).
- **ErrorHaldling** – Misma operación pero con validación explícita antes de ejecutar.
- **Introduccion** – Ejemplo básico de bloque try-catch.

### **[Parcial 1](./Parcial1)**

Ejercicio de manejo de excepciones con figuras geométricas. La clase abstracta GeometricObject es extendida por Circle, 
Rectangle y Triangle, cada una con sus cálculos de área y perímetro.

### **[Practica 1](./practica1)**

Práctica de manejo de excepciones con cuatro ejercicios progresivos:

+ **Ej1y2** – Lanzamiento y captura de excepción con try/catch/finally.
+ **Ej4** – Definición y lanzamiento de una excepción personalizada (ErrorDeProcesamientoException).
+ **Ej5** – Captura de NullPointerException al invocar un método sobre una referencia nula.
+ **Ej6** – Encadenamiento de excepciones entre métodos (cause).

### **[Practica 2](./Practica%202)**

Generador de datos de prueba para salarios. Crea un archivo salarios.txt con 1 000 registros aleatorios de empleados,
asignando un rango (asistente, asociado o titular) y un salario dentro del rango correspondiente.

## *Aplicaciones de escriotrio con **Electron***

### **[To-do](./to_do)**

Aplicación de escritorio para gestión de tareas construida con Electron + Vite. 
Usa SQLite (better-sqlite3) para persistir las tareas localmente.
 
### **[Calculadora de IMC](./Calculadora_IMC)**

Aplicación de escritorio con **Electron** que calcula el Índice de Masa Corporal (IMC) a partir del peso y la talla del
usuario, mostrando la categoría correspondiente.

### **[Markdonw Editor](./markdown-editor)**

Es una aplicación de escritorio multiplataforma que permite una escritura 
fluida y minimalista para desarrolladores y redactores técnicos. 
A diferencia de los editores basados en la nube, esta herramienta te permite trabajar directamente con tus archivos 
locales (`.md`), ofreciendo total privacidad y un rendimiento superior gracias a su arquitectura basada en Electron.

#### Características Principales:
- **Editor Enriquecido:** Basado en SimpleMDE con soporte para atajos de teclado.
- **Gestión Local:** Abre, edita y guarda archivos directamente en tu sistema.
- **Soporte Multimedia:** Renderizado de imágenes locales y remotas (incluyendo WebP).
- **Multiplataforma:** Menús y funciones optimizados para Windows y macOS.


## ***🛠️ Tecnologías utilizadas***

| Tecnología | Uso |
|---|---|
| Java | Actividades y prácticas de consola |
| Electron | Aplicaciones de escritorio multiplataforma |
| SQLite | Persistencia de datos en la app To-Do |
| SimpleMDE | Editor Markdown embebido |
| Vite | Bundler para el proyecto To-Do |
    