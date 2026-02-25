public class Ej1y2 {
    public static void main(String[] args) {
        try {
            throw new Exception("Cuidado!, este es un error de prueba, mucho ojo");
        } catch (Exception e) {

            System.out.println("Mensaje de error capturado: " + e.getMessage());

            System.out.println("\nAquí les va el Stack Trace:");
            e.printStackTrace();
        } finally {
            System.out.println("\nSe ha alcanzado el bloque finally.El programa fallo correctamente.");
        }
    }
}