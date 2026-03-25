import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.concurrent.ThreadLocalRandom;

public class GeneradorSalarios {

    public static void main(String[] args) {
        String nombreArchivo = "salarios.txt";
        String[] rangos = {"asistente", "asociado", "titular"};

        try (PrintWriter salida = new PrintWriter(nombreArchivo)) {
            for (int i = 1; i <= 1000; i++) {
                int indiceRango = ThreadLocalRandom.current().nextInt(3);
                String rango = rangos[indiceRango];

                double salario = generarSalarioPorRango(rango);

                salida.printf("Nombre%d Apellido%d %s %.2f%n", i, i, rango, salario);
            }
            System.out.println("Archivo '" + nombreArchivo + "' generado exitosamente.");
        } catch (FileNotFoundException e) {
            System.err.println("Error: No se pudo crear el archivo.");
        }
    }

    private static double generarSalarioPorRango(String rango) {
        double min, max;
        switch (rango) {
            case "asistente":
                min = 50000.00;
                max = 80000.00;
                break;
            case "asociado":
                min = 60000.00;
                max = 110000.00;
                break;
            case "titular":
                min = 75000.00;
                max = 130000.00;
                break;
            default:
                min = 0;
                max = 0;
        }
        return ThreadLocalRandom.current().nextDouble(min, max);
    }
}